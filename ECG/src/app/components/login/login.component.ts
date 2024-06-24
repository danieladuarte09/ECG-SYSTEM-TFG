import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    MatFormFieldModule,   
    MatCardModule, 
    ReactiveFormsModule, 
    FormsModule, 
    CommonModule,
    
        ReactiveFormsModule,
        
    
   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login'; // Modo inicial de inicio de sesión
  formDataLogin!: FormGroup;
  formDataRegister!: FormGroup;

  constructor(
      private userService: UserService,
      private router: Router,
      private fb: FormBuilder,
      private authService: AuthService
  ) {
      this.initializeForms();
  }

  initializeForms() {
      // Inicializar formulario de inicio de sesión
      this.formDataLogin = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
      });

      // Inicializar formulario de registro
      this.formDataRegister = this.fb.group({
          name: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
      });
  }

  switchMode() {
      // Alternar entre los modos de inicio de sesión y registro
      this.mode = this.mode === 'login' ? 'register' : 'login';
  }

  submitDataLogin() {
      if (this.formDataLogin.valid) {
          this.userService.login(this.formDataLogin.value)
              .then(response => {
                  console.log(response);
                  this.router.navigate(['/home']);
                  this.authService.login();
              })
              .catch(error => {
                  console.error('Login error:', error);
                  // Manejar error de inicio de sesión
              });
      }
  }

  submitDataRegister() {
      if (this.formDataRegister.valid) {
          this.userService.register(this.formDataRegister.value)
              .then(response => {
                  console.log(response);
                  this.switchMode(); // Cambiar al modo de registro
                  //this.router.navigate(['/Home']);
              })
              .catch(error => {
                  console.error('Register error:', error);
                  // Manejar error de registro
              });
      }
  }

  loginWithGoogle() {
      this.userService.loginWithGoogle()
          .then(response => {
              console.log(response);
              this.router.navigate(['/home']);
              this.authService.login();
          })
          .catch(error => {
              console.error('Google login error:', error);
              // Manejar error de inicio de sesión con Google
          });
  }

  createAccount() {
      this.switchMode(); // Cambiar al modo de registro
  }
}