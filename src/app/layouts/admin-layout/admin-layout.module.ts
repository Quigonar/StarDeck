import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LbdModule } from '../../lbd/lbd.module';
import { FooterModule } from 'app/shared/footer/footer.module';
import { NavbarModule } from 'app/shared/navbar/navbar.module';
import { SidebarModule } from 'app/sidebar/sidebar.module';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { AddCardComponent } from 'app/ManageCards/add-card/add-card.component';
import { EditCardComponent } from 'app/ManageCards/edit-card/edit-card.component';
import { CardsComponent } from 'app/ManageCards/cards/cards.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { PlanetsComponent } from 'app/ManagePlanets/planets/planets.component';
import { AddPlanetComponent } from 'app/ManagePlanets/add-planet/add-planet.component';
import { EditPlanetComponent } from 'app/ManagePlanets/edit-planet/edit-planet.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    ReactiveFormsModule,

    NavbarModule,
    FooterModule,
    SidebarModule,
  ],
  declarations: [
    CardsComponent,
    AddCardComponent,
    EditCardComponent,
    PlanetsComponent,
    AddPlanetComponent,
    EditPlanetComponent,
  ],
  providers: [
  ],
})

export class AdminLayoutModule {}
