import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  IonHeader,  IonToolbar,  IonButtons,  IonMenuButton,  IonTitle,  IonContent,  IonItem,  IonLabel,  IonInput,  
  IonSelect,  IonSelectOption,  IonCard,  IonCardContent,  IonButton,  IonToggle,} from '@ionic/angular/standalone';
import { Firestore, collection, addDoc, query, where,getDocs,collectionData,updateDoc,doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-prod-registro',
  templateUrl: './prod-registro.page.html',
  styleUrls: ['./prod-registro.page.scss'],
  standalone: true,
  imports: [CommonModule,    FormsModule,    ReactiveFormsModule,
    IonHeader,    IonToolbar,    IonButtons,    IonMenuButton,    IonTitle,    IonContent,    IonItem,    IonLabel,    
    IonInput,    IonSelect,    IonSelectOption,    IonCard,    IonCardContent,    IonButton,    IonToggle] })

export class ProdRegistroPage implements OnInit {
  categorias: any[] = [];

  productoForm = this.fb.group({
    productoId: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: [''],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoriaId: ['', Validators.required], // 🔑 guarda ID REAL
    imagenUrl: ['', Validators.required],
    activo: [true]
  });

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    const ref = collection(this.firestore, 'categoria');
    const q = query(ref, where('activo', '==', true));

    collectionData(q).subscribe(data => {
      this.categorias = data;
    });
  }

  async registrar() {
    if (this.productoForm.invalid) return;

    const ref = collection(this.firestore, 'producto');
    await addDoc(ref, this.productoForm.value);

    this.productoForm.reset({ activo: true });
  }
}