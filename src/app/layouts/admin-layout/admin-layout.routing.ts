import { Routes } from '@angular/router';

import { AddCardComponent } from 'app/ManageCards/add-card/add-card.component';
import { EditCardComponent } from 'app/ManageCards/edit-card/edit-card.component';
import { CardsComponent } from 'app/ManageCards/cards/cards.component';
import { PlanetsComponent } from 'app/ManagePlanets/planets/planets.component';
import { AddPlanetComponent } from 'app/ManagePlanets/add-planet/add-planet.component';
import { EditPlanetComponent } from 'app/ManagePlanets/edit-planet/edit-planet.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'cartas', pathMatch: 'full'},
    { path: 'cartas',         component:CardsComponent},
    { path: 'anadir_carta',      component:AddCardComponent},
    { path: 'editar_carta/:id', component:EditCardComponent},
    { path: 'planetas',        component:PlanetsComponent},
    { path: 'anadir_planeta',  component:AddPlanetComponent},
    { path: 'edit_planeta/:id', component:EditPlanetComponent}
];