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
    correo : new FormControl(''),
    contrasena : new FormControl('')
  })

  signUpForm = new FormGroup({
    nombre : new FormControl(''),
    username : new FormControl(''),
    nacionalidad : new FormControl(''),
    contrasena : new FormControl(''),
    password_confirmation : new FormControl(''),
    correo : new FormControl(''),
    id : new FormControl(''),
    estado: new FormControl(true),
    administrador: new FormControl(false),
    ranking: new FormControl(0),
    monedas: new FormControl(0),
    avatar: new FormControl(''),
    actividad: new FormControl('')
  })

  create_account : boolean = false
  password_count : number = 0
  username_count : number = 0
  player : PlayerI
  nations : any

  constructor(private api:ApiService, private routeService:RouteService, private router:Router, private alert:AlertService, private infoVerifier:VerifyService) {
    this.signUpForm.controls['contrasena'].valueChanges.subscribe((newValue) => {
      this.password_count = newValue.length
    });
    this.signUpForm.controls['username'].valueChanges.subscribe((newValue) => {
      this.username_count = newValue.length
    });
   }
  
  ngOnInit(): void {
    //Call api to import all nations available for the game
    this.nations = ["Costa Rica", "Mexico", "Estados Unidos"]
    this.player = {
      id: '',
      nombre: '',
      username: '',
      nacionalidad: '',
      contrasena: '',
      correo: '',
      estado: true,
      administrador: false,
      ranking: 0,
      monedas: 0,
      avatar: '',
      actividad: '',
    }
  }

  signUp() {
    this.create_account = !this.create_account
  }

  forgotPassword() {
    console.log("Forgot Password")
  }

  onLogin(form) {
    this.api.login(form).subscribe(answer => {
      if (answer.found && answer.usuario.administrador) {
        this.routeService.switch("admin", answer.usuario.id)
      } else if (answer.found && !answer.usuario.administrador) {
        this.routeService.switch("client", answer.usuario.id)
      }
      else {
        this.alert.createAlert("fa fa-exclamation-triangle", "danger", "Los credenciales estan erroneos!")
      }
    })
  }

  onSignUp(form) {
    this.player = form

    if (this.infoVerifier.verifyUserInfo(form)) {
      
      //Hacer el post por el API
      this.api.addUser(this.player).subscribe(answer => {
        this.routeService.switch("first",answer.id)
        /*if (this.infoVerifier.verifyUserAnswer(answer)) {
          this.player.id = answer
          this.routeService.switch("first", this.player.id)
        }
        */
      })
    }
  }
}

