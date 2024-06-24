import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ChartData } from 'chart.js';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import 'zone.js';
import { Subscription, firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../service/notification.service';
import { TimeService } from '../../services/time.service';
import { RouterModule } from '@angular/router';
import { AddPatientDatabaseService } from '../../services/add-patient-database.service';
import Patient from '../../models/Patient';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [
    CommonModule, // Reemplazar BrowserModule con CommonModule
    CanvasJSAngularChartsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    RouterModule,
    RouterModule
  ],
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})


export class MonitoringComponent implements OnInit, OnDestroy {

  chartOptions: any;
  dataSubscription: Subscription = new Subscription();
  notificationSubscription: Subscription = new Subscription();
  patientName: string = '' ; 
  patientId: string = ''; 
  connectionStatus: string = 'Disconnected'; // Estado de la conexión
  currentTime: string = new Date().toLocaleTimeString(); 
  receivingData: boolean = false; // Indicador de recepción de datos
  notifications: string[] = []; // Array para almacenar notificaciones
  note: string = ''; // Nota actual del ECG
  notesHistory: string[] = []; // Historial de notas
  patients: Patient[] = [];
  selectedPatient: Patient | null = null;





  constructor(
    private firebaseService: FirebaseService,
    private notificationService: NotificationService,
    private timeService: TimeService,
    private addPatientService: AddPatientDatabaseService
  ) 
  
  {
    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "ECG Data"
      },
      axisX: {
        title: "Time",
    
      },
      axisY: {
        title: "Value",
        includeZero: false
      },
      data: [{
        type: "line",
        lineThickness: 2,
        markerType: "none",
        dataPoints: []
      }]
    };
  }

  ngOnInit(): void {
    // Inicializar sin cargar datos
    this.connectionStatus = 'Ready to connect';

    this.timeService.getCurrentTime().subscribe(time => {
      this.currentTime = time;
    });

    //recibir información de los pacientes desde bbdd de firebase
    this.addPatientService.getPatients().subscribe(data => {
      this.patients = data;
      this.patients.reverse(); // Invierte el orden del array
    });
    
    // Suscribirse a las notificaciones
    this.notificationSubscription = this.notificationService.getNotifications().subscribe((message: string) => {
      this.notifications.push(message);
    });
  }

  //Seleccionar paciente para realizar el ECG

  selectPatient(patient: Patient) {
    this.selectedPatient = patient;
  
  }

  //Añadir nota del ECG
  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  //Empezamos a recibir la info del ECG de firestore
  startReceivingData() {
    this.receivingData = true;
    this.connectionStatus = 'Connecting...';
    this.dataSubscription = this.firebaseService.getEcgData().subscribe({
      next: (data: number[]) => {
        if (data && data.length > 0) {
          this.chartOptions.data[0].dataPoints = data.map((value: number, index: number) => ({ x: index, y: value }));
          this.chartOptions = { ...this.chartOptions };
          this.connectionStatus = 'Connected';
          this.notificationService.notify('Patient has started sending ECG data.');
        } else {
          console.error("No se recibieron datos válidos desde Firebase.");
        }
      },
      error: (error: any) => {
        console.error("Error al obtener datos desde Firebase:", error);
        this.connectionStatus = 'Error';
      }
    });
  }
  

 

  stopReceivingData() {
    this.receivingData = false;
    this.connectionStatus = 'Disconnected';
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  //Guardar en la BBDD el ECG obtenido y la nota del doctor.

  async AddEcgData() {
    try {
      const ecgDataNumbers: number[] = await firstValueFrom(this.firebaseService.getEcgData());
  
      if (this.selectedPatient) {
        const updateDate = {
          hour: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString()
        };
  
        await this.addPatientService.updatePatientEcgData(
          this.selectedPatient.patientId,
          ecgDataNumbers,
          this.note,
          updateDate,
          this.selectedPatient.patientName ,// pasar el nombre del paciente seleccionado
          this.selectedPatient.patientCondition,
          this.selectedPatient.patientAge 

        );
  
        console.log('Datos del ECG del paciente actualizados correctamente.');
      } else {
        console.error('No hay paciente seleccionado.');
      }
    } catch (error) {
      console.error('Error al actualizar los datos del ECG del paciente:', error);
    }
  }
  
  


}