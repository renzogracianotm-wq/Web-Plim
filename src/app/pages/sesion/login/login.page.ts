import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonItem,  IonLabel,  IonInput,  IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme';

import { getApp } from "firebase/app";
import { getRemoteConfig, fetchAndActivate, getValue, } from "firebase/remote-config";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],  
  imports: [ReactiveFormsModule, CommonModule,IonContent,
  IonHeader,  IonTitle,  IonToolbar,  IonItem,  IonLabel,
  IonInput,  IonButton ],
  standalone: true
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, //  inyectamos servicio
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.loadThemeFromFirebase();
    //this.themeService.loadTheme();
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async iniciarSesion() {
    if (this.loginForm.invalid) {
      return alert('Completa todos los campos correctamente');
    }

    const { correo, password } = this.loginForm.value;

    try {
      await this.authService.login(correo, password); // usamos servicio
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/cata-ver']);
    } catch (error) {
      alert('Correo o contraseña incorrectos');
    }
  }
  irARegistro() {
  this.router.navigate(['/register']);
}
  irACatalogo() {
    this.router.navigate(['/cata-ver']);
  }
  setTheme(theme: string) {
  this.themeService.setTheme(theme);
}

async loadThemeFromFirebase() {
  const remoteConfig = getRemoteConfig(getApp());

  remoteConfig.settings = {
  minimumFetchIntervalMillis: 0,
  fetchTimeoutMillis: 60000
  };

  await fetchAndActivate(remoteConfig);

  const theme = getValue(remoteConfig, "app_theme").asString();

  console.log("Tema desde Firebase:", theme);

  if (theme) {
    this.setTheme(theme);
  }
}
}
