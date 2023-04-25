import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { RouteService } from 'app/services/route.service';
import { Router } from '@angular/router';
import { PlayerI } from 'app/models/player.interface';
import { AlertService } from 'app/services/alert.service';
import { VerifyService } from 'app/services/verifier.service';
import { info } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user : new FormControl(''),
    password : new FormControl('')
  })

  signUpForm = new FormGroup({
    Nombre : new FormControl(''),
    Username : new FormControl(''),
    Nacionalidad : new FormControl(''),
    Contrasena : new FormControl(''),
    password_confirmation : new FormControl(''),
    Correo : new FormControl(''),
    Id : new FormControl(''),
    Estado: new FormControl(true),
    Administrador: new FormControl(false),
    Ranking: new FormControl(0),
    Monedas: new FormControl(0),
    Avatar: new FormControl('')
  })

  create_account : boolean = false
  password_count : number = 0
  username_count : number = 0
  player : PlayerI
  nations : any

  constructor(private api:ApiService, private routeService:RouteService, private router:Router, private alert:AlertService, private infoVerifier:VerifyService) {
    this.signUpForm.controls['Contrasena'].valueChanges.subscribe((newValue) => {
      this.password_count = newValue.length
    });
    this.signUpForm.controls['Username'].valueChanges.subscribe((newValue) => {
      this.username_count = newValue.length
    });
   }
  
  ngOnInit(): void {
    //Call api to import all nations available for the game
    this.nations = ["Costa Rica", "Mexico", "Estados Unidos"]
    this.player = {
      Id: '',
      Nombre: '',
      Username: '',
      Nacionalidad: '',
      Contrasena: '',
      Correo: '',
      Estado: true,
      Administrador: false,
      Ranking: 0,
      Monedas: 0,
      Avatar: ''
    }
  }

  signUp() {
    this.create_account = !this.create_account
  }

  forgotPassword() {
    console.log("Forgot Password")
  }

  onLogin(form) {
    if (form.user === "admin" && form.password === "admin") {
      this.routeService.switch("admin", "0")
    }
    else if (form.user === "client" && form.password === "client") {
      this.routeService.switch("client", "0")
    }
  }

  onSignUp(form) {
    this.player = form
    console.log(this.player)

<<<<<<< Updated upstream
    var type, message, icon
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

    if (form.name === '' || form.username === '' || form.nationality === '' || form.password === '' || form.password_confirmation === '' || form.email === '') {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que todas las casillas esten llenas, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }
    else if (form.username.length > 30 || form.username.length < 1) {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que el usuario contenga entre 1-30 caracteres, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }
    else if (form.password.length != 8) {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que la contraseña sea exactamente de 8 caracteres, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }
    else if (!(alphanumericRegex.test(form.password))) {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que la contraseña contenga números y letras, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }
    else if (form.password != form.password_confirmation) {
      icon = "fa fa-exclamation-triangle"
      type = "danger"
      message = "Porfavor asegúrese de que las contraseñas coincidan, vuelva a intentarlo."
      this.alert.createAlert(icon,type,message)
    }

    // Tambien hay que revisar si el correo se encuentra o no en la base de datos, devolver error exclusivo para caso de que el correo ya se encuentre en el DB
    // Si devuelve 1 es que el username existe, 2 correo existe, caulquier otra cosa success

    else {
      this.player.Nombre = form.name
      this.player.Contrasena = form.password
      this.player.Correo = form.email
      this.player.Username = form.username
      this.player.Nacionalidad = form.nationality

      //Hacer el post por el API y desde el API responder con el ID dado al jugador y reemplazar this.player.ID
      this.api.addUser(this.player).subscribe(answer => {
        if (answer === "2") {
          icon = "fa fa-exclamation-triangle"
          type = "danger"
          message = "El usuario ingresado ya existe, cambielo y vuelva a intentarlo."
          this.alert.createAlert(icon,type,message)
        }
        else if (answer === "1") {
          icon = "fa fa-exclamation-triangle"
          type = "danger"
          message = "El correo ingresado ya existe, cambielo y vuelva a intentarlo."
          this.alert.createAlert(icon,type,message)
        } else {
          icon = "fa fa-check"
          type = "success"
          message = "La cuenta ha sido creada exitosamente"
          this.alert.createAlert(icon,type,message)
          this.player.ID = answer
          this.routeService.switch("first", this.player.ID)
=======
    if (this.infoVerifier.verifyUserInfo(form)) {
      
      //Hacer el post por el API
      this.api.addUser(this.player).subscribe(answer => {
        if (this.infoVerifier.verifyUserAnswer(answer)) {
          this.player.Id = answer
          this.routeService.switch("first", this.player.Id)
>>>>>>> Stashed changes
        }
      })
    }
  }
}

