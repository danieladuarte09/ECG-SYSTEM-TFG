import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

 

  constructor(private db: AngularFireDatabase) { }

  getEcgData(): Observable<number[]> {
    return this.db.object<string>('ecgData').valueChanges()
      .pipe(
        map(dataString => {
          if (dataString === null) {
            throw new Error('Data is null'); // or handle it according to your application logic
          }
          // Parse the data string to an array of numbers
          const dataArray = JSON.parse(dataString) as number[];
          console.log(dataString);
          console.log(dataArray);
          
          
          return dataArray;
        })
      );
  }
}
//service to get the information from firesbase realtime database and show it in the component.