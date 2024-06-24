import { Routes } from '@angular/router';
import { MonitoringComponent,  } from './components/monitoring/monitoring.component';
import { HomeComponent } from './components/home/home.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


export const routes: Routes = [
  

  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige la ruta raíz a /home
  { path: 'home', component: HomeComponent,
  ...canActivate(()=> redirectUnauthorizedTo(['/login']))
   },
  { path: 'monitoring', component: MonitoringComponent },
  { path: 'medical-history', component: MedicalHistoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];