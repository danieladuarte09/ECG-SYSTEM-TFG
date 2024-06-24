
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SideNavBarComponent } from "./components/side-nav-bar/side-nav-bar.component";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { HomeComponent } from "./components/home/home.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet,
        RouterOutlet, RouterLink, RouterLinkActive,
        SideNavBarComponent, LoginComponent, RegisterComponent, MonitoringComponent, HomeComponent]
})
export class AppComponent {
  title = 'ECG';
  constructor(public authService: AuthService) {}

  
}
