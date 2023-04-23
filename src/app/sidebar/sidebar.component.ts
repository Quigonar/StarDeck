import { Component, OnInit } from '@angular/core';
import { RouteService } from 'app/services/route.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const Admin: RouteInfo[] = [
  { path: '/employees', title: 'Cartas',  icon:'fa fa-book', class: '' },
  { path: '/affiliates', title: 'Parametros',  icon:'fa fa-cog', class: '' },
  { path: '/types', title: 'Jugadores',  icon:'fa fa-users', class: '' },
  { path: '/dealers', title: 'Estadisticas',  icon:'fa fa-line-chart', class: '' },
  { path: '/reports', title: 'Manejo de Tienda', icon:'fa fa-cart-plus', class:'' },
  { path: '/reports', title: 'Reportes', icon:'fa fa-exclamation', class:'' }
]

export var Affiliate: RouteInfo[] = []

export var Client: RouteInfo[] = []

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public user: RouteService) { 
    
  }

  ngOnInit() {
    Client = [
      //{ path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    ]

    if (this.user.userLogged() == "admin") {
      this.menuItems = Admin.filter(menuItem => menuItem)
    } else if (this.user.userLogged() == "affiliate") {
      this.menuItems = Affiliate.filter(menuItem => menuItem)
    } else if (this.user.userLogged() == "client") {
      this.menuItems = Client.filter(menuItem => menuItem)
    }

    

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}