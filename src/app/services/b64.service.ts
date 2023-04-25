import { Injectable } from '@angular/core';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class b64Service {

    getBase64 = async($event: any) => new Promise((resolve,reject) => {
        try {
        const reader = new FileReader()
        reader.readAsDataURL($event)
        reader.onload = () => {
            resolve({
            base:reader.result
            
            })
        }
        reader.onerror = error => {
            resolve ({
            base:null
            })
        }
        } catch(e){
        return null
        }
    })
}