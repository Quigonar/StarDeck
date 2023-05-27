import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouteService } from 'app/services/route.service';
import { ApiService } from 'app/services/api.service';
import { PlayerI } from 'app/models/player.interface';
import { filter } from 'rxjs/operators';

@Component({
    // moduleId: module.id,
    selector: 'navbar2-cmp',
    templateUrl: 'navbar2.component.html'
})

export class Navbar2Component implements OnInit{
    public player: PlayerI;
    public sections: string[] = ['Jugar', 'Mazos', 'Coleccion', 'Historial', 'Tienda']
    activeSectionIndex: number = 0

    constructor(private router:Router, public user:RouteService, private api:ApiService) {
        
    }

    logout(){
        this.user.switch('login','0')
        this.router.navigate(['login'])
    }

    viewProfile(playerId) {
    }

    setActiveSection(index: number) {
        this.activeSectionIndex = index;
        this.router.navigate(['/' + this.sections[index].toLowerCase() + '/'])
    }

    getRouteName(url: string): string {
        const routeParts = url.split('/');
        return routeParts[routeParts.length - 1];
      }

    ngOnInit(){
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                let currentRoute = this.getRouteName(event.url);
                for (let i=0; i <=5; i++) {
                    if (this.sections[i].toLowerCase() === currentRoute) {
                        this.activeSectionIndex = i
                    }
                }
        });
        this.api.getPlayerID(this.user.userID()).subscribe(player => {
            this.player = player
        })
    }
}
