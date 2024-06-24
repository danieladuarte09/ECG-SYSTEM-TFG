import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.scss'
})
export class SideNavBarComponent {
  constructor(
    private userService: UserService,
    private routes: Router,
    private authService: AuthService
  ) {}

  onClick(){
    this.userService.logOut()
    
    .then(() => {
        console.log('Salida de sesión exitosa. Redirigiendo a /login...');
        this.routes.navigate(['/login']);
        this.authService.logout();
        
       
    })
    .catch(error => {
        console.log('Error durante la salida de sesión:', error);
    });

  }

}


