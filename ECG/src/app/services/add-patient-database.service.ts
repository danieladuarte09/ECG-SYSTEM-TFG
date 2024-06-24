import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import Patient from '../models/Patient';
import { DocumentReference, addDoc, collection, deleteDoc, doc, getDoc, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Observable, catchError, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPatientDatabaseService {

  constructor(private firestore: Firestore) { }

  /** PETICIONES A LA PACIENTES */

  addPatient(patient: Patient) {
    const patientRef = collection(this.firestore, 'patients');
    return addDoc(patientRef, patient);
  }

  //Obtener pacientes de la BBDD
  getPatients(): Observable<Patient[]> {
    const patientsRef = collection(this.firestore, 'patients');
    return collectionData(patientsRef, { idField: 'id' }).pipe(
      map((patients: any[]) => patients.map(patient => ({
        patientId: patient.patientId,
        patientName: patient.patientName,
        patientAge: patient.patientAge,
        patientCondition: patient.patientCondition,
        ecgData: patient.ecgData || [],
        Notes: patient.Notes || '',
        date: patient.date || { hour: '', date: '' }
      })))
    );
  }
  

  getPatientById(patientId: string): Observable<Patient> {
    const patientDocRef = doc(this.firestore, `patients/${patientId}`);
    return docData(patientDocRef).pipe(
      map((patient: any) => ({
        patientId: patient.patientId,
        patientName: patient.patientName,
        patientAge: patient.patientAge,
        patientCondition: patient.patientCondition,
        ecgData: patient.ecgData || [],
        Notes: patient.Notes || '',
        date: patient.date || { hour: '', date: '' }
      }))
    );
  }




  addEcgData(ecgData: Patient) {
    const ecgRef = collection(this.firestore, 'ECG-Data');
    return addDoc(ecgRef, ecgData);

  }

  deletePatient(patient: Patient){
    const patientDocRef = doc(this.firestore, `patients/${patient.patientId}`);
    return deleteDoc(patientDocRef)

  }

  /**
   * SEPARACIÓN DE PETICIONES A LA BASE DE DATOS
   */

  /** PETICIONES A LA HISTORIAL_TABLE */

  // Actualizar pacientes ya existentes 

  async updatePatientEcgData(patientId: string, ecgData: number[], notes: string, date: any, patientName: string, patientCondition: string, patientAge: number ): Promise<void> {
    const patientRef = doc(this.firestore, 'patients', patientId); // Referencia al documento del paciente
    

    try {
     
      // Creamos  una nueva coleccion en firebase 'historial_table'
      const historialRef = collection(this.firestore, 'historial_table');
      await addDoc(historialRef, {
        ecgData: ecgData,
        patientId: patientId,
        patientName: patientName,
        Notes: notes,
        date: date,
        patientCondition: patientCondition,
        patientAge: patientAge

      });

      console.log('Datos del ECG del paciente actualizados y guardados en historial correctamente.');
    } catch (error) {
      console.error('Error al actualizar los datos del ECG del paciente o al guardar en historial:', error);
      throw error;
    }
  }

    //Obtener pacientes del historial de la BBDD
    getPatientsHistorial(): Observable<Patient[]> {
      const patientsRef = collection(this.firestore, 'historial_table');
      return collectionData(patientsRef, { idField: 'id' }).pipe(
        map((patients: any[]) => patients.map(patient => ({
          patientId: patient.patientId,
          patientName: patient.patientName,
          patientAge: patient.patientAge,
          patientCondition: patient.patientCondition,
          ecgData: patient.ecgData || [],
          Notes: patient.Notes || '',
          date: patient.date || { hour: '', date: '' }
        })))
      );
    }



 

    //OBTENER SOLO UN PACIENTE SI ES SELECCIONADO
    getPatientEcgData(patientId: string): Observable<Patient[]> {
      const patientsRef = collection(this.firestore, 'historial_table');
      const q = query(patientsRef, where('patientId', '==', patientId));
      return collectionData(q, { idField: 'id' }).pipe(
        map((patients: any[]) => {
          return patients.map(patient => ({
            patientId: patient?.patientId || '',
            patientName: patient?.patientName || '',
            patientAge: patient?.patientAge || '',
            patientCondition: patient?.patientCondition || '',
            ecgData: patient?.ecgData || [],
            Notes: patient?.Notes || '',
            date: patient?.date || { hour: '', date: '' }
          }));
        })
      );
    }

}



