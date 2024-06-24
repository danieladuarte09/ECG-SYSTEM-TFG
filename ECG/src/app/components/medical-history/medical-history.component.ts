import { Component, OnInit } from '@angular/core';
import { AddPatientDatabaseService } from '../../services/add-patient-database.service';
import Patient from '../../models/Patient';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';



@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatIcon,
    MatDialogModule, 
    MatButtonModule,
    CanvasJSAngularChartsModule
    
  ],

})
export class MedicalHistoryComponent implements OnInit {
  patients: Patient[] = [];
  selectedPatient: Patient | null = null;
  selectedPatientEcgData: any[] = []; 

  chartOptions: any;

  constructor(private patientService: AddPatientDatabaseService) { }

  ngOnInit(): void {
    this.loadPatients();
  }
  //cargamos pacientes en la vista general
  loadPatients(): void {
    this.patientService.getPatientsHistorial().subscribe((patients: Patient[]) => {
      this.patients = patients;
      this.patients.reverse(); // Invierte el orden del array
    });
  }

    //obtener los pacientes del historial_table
  loadPatientsHistorial(): void {
    this.patientService.getPatients().subscribe((patients: Patient[]) => {
      this.patients = patients;
      this.patients.reverse(); // Invierte el orden del array
    });
  }



  
  getEcgData(patientId: string): void {
    this.patientService.getPatientEcgData(patientId).subscribe(
      (historial: any[]) => {
        this.selectedPatientEcgData = historial; // Actualizamos la variable con los datos del historial
        this.updateChart(historial[0]?.ecgData || []); // Actualiza el gráfico con los datos del primer registro 
        console.log('Historial del paciente:', this.selectedPatientEcgData);
      },
      (error: any) => {
        console.error('Error al obtener el historial del paciente:', error);
      }
    );
  }

  updateChart(ecgData: number[]): void {
    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "ECG Data"
      },
      axisX: {
        title: "Time"
      },
      axisY: {
        title: "ECG Value"
      },
      data: [{
        type: "line",
        dataPoints: ecgData.map((value, index) => ({ x: index, y: value }))
      }]
    };
  }
}

  
