import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouteService } from './services/route.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { FirstLoginLayoutComponent } from './layouts/first-login-layout/first-login-layout.component';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { UserStorageService } from './services/user-storage.service';

const routes: Routes =[
  { path: '', redirectTo: 'login', pathMatch: 'full'}, 
  { path: 'login',                           component:LoginComponent }
  
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,

    NavbarModule,
    FooterModule,
    SidebarModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    FirstLoginLayoutComponent,
    LoginComponent
  ],
  providers: [
    RouteService,
    UserStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { 
  constructor (private router: Router, private routeService: RouteService) {
    routeService.onUserChange.subscribe(this.resetRouterConfig(true).bind(this))
    this.resetRouterConfig(false)()
    this.router.initialNavigation()
  }

  reloadCurrentRoute(){
    const currentUrl = this.router.url
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  resetRouterConfig(refresh: boolean) {
    return () => {
      const constructedConfig = [
        
        {
          path: '',
          loadChildren: () => {
            if (this.routeService.userLogged() == "admin") {
              return import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
            } else if (this.routeService.userLogged() == "client") {
              return import('./layouts/client-layout/client-layout.module').then((m) => m.ClientLayoutModule)
            } else if (this.routeService.userLogged() == "first") {
              return import('./layouts/first-login-layout/first-login-layout.module').then((m) => m.FirstLoginLayoutModule)
            } else {
              return routes
            }

          },
        },
      ];

      this.router.resetConfig(constructedConfig);

      if (refresh) this.reloadCurrentRoute();
    };
  }

}
