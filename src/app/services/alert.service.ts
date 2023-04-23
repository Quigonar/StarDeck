import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async, Observable } from 'rxjs'
import { recommender } from 'googleapis/build/src/apis/recommender';
import { DomSanitizer } from '@angular/platform-browser';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

    constructor(private http:HttpClient) { }

    createAlert(icon, type, message) {
        $.notify({
            icon: icon,
            message: message
        },{
            type: type,
            timer: 1000,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
      }
}