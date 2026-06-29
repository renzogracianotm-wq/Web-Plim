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

  categoriaForm!: FormGroup;

  selectedFile!: File;
  subiendo = false;

  // 🔹 Reemplaza por tu Cloud Name
  private readonly CLOUD_NAME = 'dahefh6aq';

  // 🔹 Reemplaza por el nombre de tu Upload Preset
  private readonly UPLOAD_PRESET = 'minimoda_upload';

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore
  ) {}

  ngOnInit() {

    this.categoriaForm = this.fb.group({
      categoriaId: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      imagenUrl: ['', Validators.required],
      activo: [true]
    });

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

      formData.append(
        'upload_preset',
        this.UPLOAD_PRESET
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();

      if (data.secure_url) {

        this.categoriaForm.patchValue({
          imagenUrl: data.secure_url
        });

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

    if (this.categoriaForm.invalid) {
      alert('Complete todos los campos');
      return;
    }

    try {

      await addDoc(
        collection(this.firestore, 'categoria'),
        this.categoriaForm.value
      );

      alert('Categoría registrada correctamente');

      this.categoriaForm.reset({
        activo: true
      });

      this.selectedFile = undefined as any;

    } catch (error) {

      console.error(error);
      alert('Error al registrar categoría');

    }

  }

}