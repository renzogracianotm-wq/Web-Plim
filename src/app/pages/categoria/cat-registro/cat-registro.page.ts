import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader,  IonToolbar,  IonButtons,  IonMenuButton,  IonTitle,  IonContent,  IonItem,
  IonLabel,  IonInput,  IonSelect,  IonSelectOption,IonIcon,
    IonCard,  IonCardContent,  IonButton,IonCardTitle,IonCardHeader } from '@ionic/angular/standalone';

import { Firestore, collection,collectionData, query, where,getDocs,updateDoc,doc,addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cat-registro',
  templateUrl: './cat-registro.page.html',
  styleUrls: ['./cat-registro.page.scss'],
  standalone: true,
  imports: [CommonModule,    FormsModule,    MenuComponent,    IonHeader,    
      IonToolbar,    IonButtons,    IonMenuButton,    IonTitle,    IonContent,
      IonItem,    IonLabel,    IonInput,    IonSelect,    IonSelectOption,IonIcon,
    IonCard,  IonCardContent,  IonButton,IonCardTitle,ReactiveFormsModule,IonCardHeader]
})
export class CatRegistroPage implements OnInit {

   // 🔥 ahora todo es simple variables
  nombre = '';
  descripcion = '';
  imagenUrl = '';
  activo = true;

  selectedFile: File | null = null;
  subiendo = false;

  private readonly CLOUD_NAME = 'dahefh6aq';
  private readonly UPLOAD_PRESET = 'minimoda_upload';

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    // vacío o lógica futura
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async subirImagen() {
    if (!this.selectedFile) {
      alert('Seleccione una imagen');
      return;
    }

    this.subiendo = true;

    try {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', this.UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        this.imagenUrl = data.secure_url;
        alert('Imagen subida correctamente');
      } else {
        console.error(data);
        alert('Error al subir imagen');
      }

    } catch (error) {
      console.error(error);
      alert('Error al conectar con Cloudinary');
    } finally {
      this.subiendo = false;
    }
  }

  async registrar() {

    if (!this.nombre || !this.imagenUrl) {
      alert('Complete los campos obligatorios');
      return;
    }

    const categoriaId =
      'CAT-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    try {
      await addDoc(collection(this.firestore, 'categoria'), {
        nombre: this.nombre,
        descripcion: this.descripcion,
        imagenUrl: this.imagenUrl,
        activo: this.activo,
        categoriaId
      });

      alert('Categoría registrada correctamente');

      // limpiar
      this.nombre = '';
      this.descripcion = '';
      this.imagenUrl = '';
      this.activo = true;
      this.selectedFile = null;

    } catch (error) {
      console.error(error);
      alert('Error al registrar categoría');
    }
  }
}