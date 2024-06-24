import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ 
    MatFormFieldModule,   
    MatCardModule, 
    ReactiveFormsModule, 
    FormsModule, 
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireAuthModule
        
    
   ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  formData: FormGroup

  constructor( 
    private userService: UserService,
    private router: Router
   ){

  


  this.formData = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });
}

submitData(){
    this.userService.register(this.formData.value)
    .then(response => { 
      console.log(response);
      this.router.navigate(['/login'])
    })
    .catch(error => console.log(error));
  }

}
