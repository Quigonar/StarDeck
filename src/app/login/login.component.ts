import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { RouteService } from 'app/services/route.service';
import { Router } from '@angular/router';
import { PlayerI } from 'app/models/player.interface';
import { AlertService } from 'app/services/alert.service';
import { VerifyService } from 'app/services/verifier.service';
import { SHA256 } from 'crypto-js';

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

    if (this.infoVerifier.verifyUserInfo(form)) {
      //Encryptar la contraseña una vez verificada
      this.player.Contrasena = SHA256(this.player.Contrasena).toString()
      //Hacer el post por el API
      this.api.addUser(this.player).subscribe(answer => {
        if (this.infoVerifier.verifyUserAnswer(answer)) {
          this.player.Id = answer
          this.routeService.switch("first", this.player.Id)
        }
      })
    }
  }
}

