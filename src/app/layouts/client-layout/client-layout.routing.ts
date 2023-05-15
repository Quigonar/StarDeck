import { Routes } from '@angular/router';
import { AddDeckComponent } from 'app/ManageDecks/add-deck/add-deck.component';
import { DecksComponent } from 'app/ManageDecks/decks/decks.component';
import { EditDeckComponent } from 'app/ManageDecks/edit-deck/edit-deck.component';
import { FirstLoginComponent } from 'app/login/first-login/first-login.component';



export const ClientLayoutRoutes: Routes = [
    { path: '', redirectTo: 'first-login', pathMatch: 'full' },
    { path: 'mazos',           component:DecksComponent },
    { path: 'anadir-mazo',     component:AddDeckComponent },
    { path: 'editar-mazo',     component:EditDeckComponent }
    
    //{ path: 'user',                                     component: UserComponent },

];