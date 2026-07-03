import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonMenu, MenuController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthService } from '../../../services/auth';
import { ThemeService } from '../../../services/theme';

import { getApp } from "firebase/app";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ ReactiveFormsModule, CommonModule, IonContent, IonHeader, IonTitle,
    IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonMenu  ],
  standalone: true
})
export class LoginPage implements OnInit {
 
  // VARIABLES  
  loginForm!: FormGroup;

  
  // CONSTRUCTOR  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService,
    private alertController: AlertController,
    private menuCtrl: MenuController
  ) {}

  
  // CICLO DE VIDA  
  ngOnInit() {
    this.loadThemeFromFirebase();    
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  // MÉTODOS PRINCIPALES  
  async iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      await this.mostrarAlerta(
        'Datos Incorrectos',
        'Completa todos los campos correctamente.'
      );
      return;
    }

    const { correo, password } = this.loginForm.value;

    try {
      const cred = await this.authService.login(correo, password);

      this.authService.fusionarCarrito(
        cred.user.uid
      );

      await this.mostrarAlerta(
        'Éxito',
        'Inicio de sesión exitoso.'
      );

      this.router.navigate(['/cata-ver']);

    } catch (error) {
      await this.mostrarAlerta(
        'Error',
        'Correo o contraseña incorrectos.'
      );
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

  
  // UTILIDADES  
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  ionViewWillEnter() {
  this.menuCtrl.enable(false);
  this.menuCtrl.swipeGesture(false);
  }

  ionViewWillLeave() {
  this.menuCtrl.enable(true);
  this.menuCtrl.swipeGesture(true);
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
  cerrarSesion() {
  this.authService.logout().then(() => {
    this.router.navigate(['/login']);
  });
}
}