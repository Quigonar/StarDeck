import { Routes } from '@angular/router';
import { NoBackNavigationGuard } from 'app/services/nobacknavigation.service';
import { ChooseCardComponent } from 'app/login/choose-card/choose-card.component';
import { FirstLoginComponent } from 'app/login/first-login/first-login.component';



export const FirstLoginLayoutRoutes: Routes = [
    { path: '', redirectTo: 'first-login', pathMatch: 'full'},
    { path: 'first-login',  component:FirstLoginComponent, canActivate: [NoBackNavigationGuard]},
    { path: 'choose-card/:round', component:ChooseCardComponent, canActivate: [NoBackNavigationGuard]}

];