import { Routes } from '@angular/router';
import { AddDeckComponent } from 'app/ManageDecks/add-deck/add-deck.component';
import { DecksComponent } from 'app/ManageDecks/decks/decks.component';
import { EditDeckComponent } from 'app/ManageDecks/edit-deck/edit-deck.component';
import { MatchComponent } from 'app/ManageMatch/match/match.component';
import { MatchmakingComponent } from 'app/ManageMatch/matchmaking/matchmaking.component';
import { WinnerComponent } from 'app/ManageMatch/winner/winner.component';
import { NoBackNavigationGuard } from 'app/services/nobacknavigation.service';



export const ClientLayoutRoutes: Routes = [
    { path: '', redirectTo: 'jugar', pathMatch: 'full' },
    { path: 'jugar',     component:MatchmakingComponent },
    { path: 'mazos',           component:DecksComponent },
    { path: 'anadir-mazo',     component:AddDeckComponent },
    { path: 'editar-mazo',     component:EditDeckComponent },
    { path: 'partida',           component:MatchComponent, canActivate: [NoBackNavigationGuard]},
    { path: 'ganador',          component:WinnerComponent, canActivate: [NoBackNavigationGuard]}
];