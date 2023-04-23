import { Routes } from '@angular/router';
import { FirstLoginComponent } from 'app/login/first-login/first-login.component';



export const ClientLayoutRoutes: Routes = [
    { path: '', redirectTo: 'first-login', pathMatch: 'full'},
    
    //{ path: 'user',                                     component: UserComponent },

];