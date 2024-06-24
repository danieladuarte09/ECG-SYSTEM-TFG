import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
//import { firebaseConfig } from './constants/constants';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { get } from 'firebase/database';


const firebaseConfig = {
  projectId: "login-firebase-angular-15f5d",
  appId: "1:300969490501:web:919f2fa4b32ed0b73d8b2c",
  databaseURL: "https://login-firebase-angular-15f5d-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "login-firebase-angular-15f5d.appspot.com",
  apiKey: "AIzaSyD1gWviT2JBbVgywldt_DSHZAK_X9V08KE",
  authDomain: "login-firebase-angular-15f5d.firebaseapp.com",
  messagingSenderId: "300969490501"
};

/**Instalación simplificada, almacenando las caracteristicas de configuración en una variable y luego incializandola */

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      AngularFireModule.initializeApp(firebaseConfig), 
      AngularFireAuthModule,
      AngularFireDatabaseModule,
    ]),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};

/**Configuración que realizó el instalador de firebase cuando lo ejecutamos por consola */
/*
export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes), importProvidersFrom([AngularFireModule.initializeApp(firebaseConfig), 
  AngularFireAuthModule,
AngularFireDatabaseModule,
AngularFireModule ]), 
provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"login-firebase-angular-15f5d","appId":"1:300969490501:web:919f2fa4b32ed0b73d8b2c","databaseURL":"https://login-firebase-angular-15f5d-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"login-firebase-angular-15f5d.appspot.com","apiKey":"AIzaSyD1gWviT2JBbVgywldt_DSHZAK_X9V08KE","authDomain":"login-firebase-angular-15f5d.firebaseapp.com","messagingSenderId":"300969490501"})), provideFirestore(() => getFirestore(), provideAuth(() => getAuth()))
 
  ],
};*/
