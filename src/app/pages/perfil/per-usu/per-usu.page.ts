import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  IonHeader,  IonToolbar,  IonTitle,  IonContent,  IonButton,  IonItem,
  IonLabel,  IonInput,  IonCard} from '@ionic/angular/standalone';

import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-per-usu',
  templateUrl: './per-usu.page.html',
  styleUrls: ['./per-usu.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonHeader,    IonToolbar,   
     IonTitle,    IonContent,    IonButton,    IonItem,    IonLabel,    IonInput,    IonCard] })
export class PerUsuPage implements OnInit {

   usuario: any = {
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    fechaNacimiento: ''
  };

  uid: string = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        await this.cargarUsuario();
      }
    });
  }

  async cargarUsuario() {
    const ref = doc(this.firestore, `users/${this.uid}`);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      this.usuario = snap.data();
    }
  }

  async actualizarPerfil() {
    const ref = doc(this.firestore, `users/${this.uid}`);

    await updateDoc(ref, {
      nombre: this.usuario.nombre,
      telefono: this.usuario.telefono,
      direccion: this.usuario.direccion,
      ciudad: this.usuario.ciudad,
      codigoPostal: this.usuario.codigoPostal,
      fechaNacimiento: this.usuario.fechaNacimiento
    });

    alert('Perfil actualizado correctamente!');
  }

}
