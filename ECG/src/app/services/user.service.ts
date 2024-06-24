import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth:Auth) { }

  //función que recibe los datos y los envia a firebase, los registra
  register({email,password}: any){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

    //Firebase login
  login({email, password}:any){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logOut(){
    return signOut(this.auth)

  }

loginWithGoogle(){
  return signInWithPopup(this.auth, new GoogleAuthProvider());
}


}
