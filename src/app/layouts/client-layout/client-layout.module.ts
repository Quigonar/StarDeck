import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LbdModule } from '../../lbd/lbd.module';

import { ClientLayoutRoutes } from './client-layout.routing';
import { FooterModule } from 'app/shared/footer/footer.module';
import { NavbarModule } from 'app/shared/navbar/navbar.module';
import { SidebarModule } from 'app/sidebar/sidebar.module';
import { DecksComponent } from 'app/ManageDecks/decks/decks.component';
import { AddDeckComponent } from 'app/ManageDecks/add-deck/add-deck.component';
import { EditDeckComponent } from 'app/ManageDecks/edit-deck/edit-deck.component';
import { MatchComponent } from 'app/ManageMatch/match/match.component';
import { MatchmakingComponent } from 'app/ManageMatch/matchmaking/matchmaking.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClientLayoutRoutes),
    FormsModule,
    LbdModule,
    ReactiveFormsModule,

    NavbarModule,
    FooterModule,
    SidebarModule,
  ],
  declarations: [
    DecksComponent,
    AddDeckComponent,
    EditDeckComponent,
    MatchmakingComponent,
    MatchComponent
  ],
  providers: [
  ],
})
export class ClientLayoutModule {}
