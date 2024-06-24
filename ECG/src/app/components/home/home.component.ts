import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddPatientDatabaseService } from '../../services/add-patient-database.service';
import Patient from '../../models/Patient';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  addPatientForm: FormGroup;
  patients: Patient[] = [];
  mostrarFormulario: boolean = false;
  

  constructor(private AddPatientService: AddPatientDatabaseService, private fb: FormBuilder) 
  {
      this.addPatientForm = this.fb.group({
          patientId: ['', Validators.required],
          patientName: ['', Validators.required],
          patientAge: ['', Validators.required],
          patientCondition: ['', Validators.required]
      });
  }

  //Para que se carguen los pacientes al iniciar el componente.
  ngOnInit(): void {
    this.loadPatients();
  }

  async onSubmit() {
    console.log(this.addPatientForm.value);
    const response= await this.AddPatientService.addPatient(this.addPatientForm.value)
    console.log(response);
    this.addPatientForm.reset(); // Reinicia el formulario cuando la info se envie
   
    
  }

  loadPatients(): void {
    this.AddPatientService.getPatients().subscribe((patients: Patient[]) => {
      this.patients = patients;
      this.patients.reverse(); // Invierte el orden del array
    });
  }

  toggleFormVisibility() {
      this.mostrarFormulario = !this.mostrarFormulario;
      if (!this.mostrarFormulario) {
          this.addPatientForm.reset(); // Reinicia el formulario si se oculta
      }
  }

  
  
  async deletePatient(patient: Patient) {
    if (window.confirm(`Are you sure you want to delete patient ${patient.patientName}?`)) {
      try {
        await this.AddPatientService.deletePatient(patient);
        console.log('Patient deleted successfully');
        // Aquí podrías agregar una notificación al usuario si deseas
      } catch (error) {
        console.error('Error deleting patient:', error);
        // Aquí podrías mostrar una notificación de error al usuario si deseas
      }
    } else {
      console.log('Deletion canceled by user');
      // Aquí podrías mostrar una notificación o mensaje de cancelación si deseas
    }
  }
  
}
 

