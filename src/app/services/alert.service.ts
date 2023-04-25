import { Injectable } from '@angular/core';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

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