import { Routes } from '@angular/router';

import { AddCardComponent } from 'app/ManageCards/add-card/add-card.component';
import { EditCardComponent } from 'app/ManageCards/edit-card/edit-card.component';
import { CardsComponent } from 'app/ManageCards/cards/cards.component';


export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'cartas', pathMatch: 'full'},
    { path: 'cartas',         component:CardsComponent},
    { path: 'añadir_carta',      component:AddCardComponent},
    { path: 'editar_carta/:id', component:EditCardComponent},
];