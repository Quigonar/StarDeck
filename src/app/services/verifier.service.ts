import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async, Observable } from 'rxjs'
import { recommender } from 'googleapis/build/src/apis/recommender';
import { DomSanitizer } from '@angular/platform-browser';
import { CardsI } from 'app/models/cards.interface';
import { RazasI } from 'app/models/razas.interface';
import { PlayerI } from 'app/models/player.interface';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
  })
  
  export class VerifyService {

    constructor(private alert:AlertService) {}

    verifyUserInfo(form) {
        var type, message, icon
        const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

        if (form.nombre === '' || form.username === '' || form.nacionalidad === '' || form.contrasena === '' || form.password_confirmation === '' || form.correo === '') {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que todas las casillas esten llenas, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.username.length > 30 || form.username.length < 1) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que el usuario contenga entre 1-30 caracteres, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.contrasena.length != 8) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que la contraseña sea exactamente de 8 caracteres, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (!(alphanumericRegex.test(form.contrasena))) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que la contraseña contenga números y letras, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.contrasena != form.password_confirmation) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que las contraseñas coincidan, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else return true
    }

    verifyUserAnswer(answer) {
        var type, message, icon

        if (answer === "2") {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "El usuario ingresado ya existe, cambielo y vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (answer === "1") {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "El correo ingresado ya existe, cambielo y vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (answer.startsWith("U-")) {
            icon = "fa fa-check"
            type = "success"
            message = "La cuenta ha sido creada exitosamente"
            this.alert.createAlert(icon,type,message)
            return true
        } else return false
    }

    verifyCardInfo(form) {
        var type, message, icon

        if (form.nombre === '' || form.energia === '' || form.costo === '' || form.imagen === '' || form.raza === '' || form.tipo === '' || form.descripcion === '') {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que todas las casillas esten llenas, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.nombre.length > 30 || form.nombre.length < 5) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que el nombre de la carta contenga entre 5-30 caracteres, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.energia > 100 || form.energia < -100) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que la energia se encuentre en el rango de -100 a 100, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.costo > 100 || form.costo < 0) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que el costo se encuentre en el rango de 0 a 100, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.descripcion.length > 1000) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que la descripcion no contenga mas de 1000 caracteres, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else return true
    }

    verifyCardAnswer(answer) {
        var type, message, icon

        if (answer.id.startsWith("C-")) {
            icon = "fa fa-check"
            type = "success"
            message = "La carta ha sido creada exitosamente"
            this.alert.createAlert(icon, type, message)
            return true
        } else {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Error de conexión, porfavor intentelo luego"
            this.alert.createAlert(icon, type, message)
            return false
        }
    }

    verifyPlanetInfo(form) {
        var type, message, icon

        if (form.nombre === '' || form.imagen === '' || form.tipo === '' || form.descripcion === '') {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que todas las casillas esten llenas, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.nombre.length > 20 || form.nombre.length < 5) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que el nombre del planeta contenga entre 5-20 caracteres, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.descripcion.length > 1000) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que la descripcion no contenga mas de 1000 caracteres, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else return true
    }

    verifyPlanetAnswer(answer) {
        var type, message, icon

        if (answer.id.startsWith("P-")) {
            icon = "fa fa-check"
            type = "success"
            message = "El planeta ha sido creado exitosamente"
            this.alert.createAlert(icon, type, message)
            return true
        } else {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Error de conexión, porfavor intentelo luego"
            this.alert.createAlert(icon, type, message)
            return false
        }
    }

    verifyDeckInfo(form){
        var type, message, icon

        if (form.nombre === '') {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que la casilla del nombre este llena, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.nombre.length > 20 || form.nombre.length < 5) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que el nombre del planeta contenga entre 5-20 caracteres, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else if (form.cartas.length != 18) {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Porfavor asegúrese de que las cartas seleccionadas sean exactamente 18, vuelva a intentarlo."
            this.alert.createAlert(icon,type,message)
            return false
        } else return true
    }

    verifyDeckAnswer(answer) {
        var type, message, icon

        if (answer.id.startsWith("D-")) {
            icon = "fa fa-check"
            type = "success"
            message = "El mazo ha sido creado exitosamente"
            this.alert.createAlert(icon, type, message)
            return true
        } else {
            icon = "fa fa-exclamation-triangle"
            type = "danger"
            message = "Error de conexión, porfavor intentelo luego"
            this.alert.createAlert(icon, type, message)
            return false
        }
    }

  }