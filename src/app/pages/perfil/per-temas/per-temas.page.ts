import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-per-temas',
  templateUrl: './per-temas.page.html',
  styleUrls: ['./per-temas.page.scss'],
  standalone: true,
  imports: [IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  CommonModule,
  FormsModule]
})
export class PerTemasPage implements OnInit {

  ngOnInit() {
    // cargar tema guardado al entrar
    const savedTheme = localStorage.getItem('theme') as any;

    if (savedTheme) {
      this.applyTheme(savedTheme);
    } else {
      this.applyTheme('""'); // default
    }
  }

  setTheme(theme: 'pink' | 'blue' | 'dark') {
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: string) {
    // quitar todos los temas
    document.body.classList.remove(
      'theme-pink',
      'theme-blue',
      'theme-dark'
    );

    // aplicar nuevo tema
    document.body.classList.add(`theme-${theme}`);
  }
}