import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar2Component } from './navbar2.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ Navbar2Component ],
    exports: [ Navbar2Component ]
})

export class Navbar2Module {}
