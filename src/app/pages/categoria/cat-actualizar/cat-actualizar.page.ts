import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {  IonHeader,  IonToolbar,  IonButtons,  IonMenuButton,  IonTitle,  IonContent,  IonItem,
  IonLabel,  IonInput,  IonSelect,  IonSelectOption,IonIcon,
    IonCard,  IonCardContent,  IonButton,IonToggle } from '@ionic/angular/standalone';

import { Firestore, collection,collectionData, query, where,getDocs,updateDoc,doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-cat-actualizar',
  templateUrl: './cat-actualizar.page.html',
  styleUrls: ['./cat-actualizar.page.scss'],
  standalone: true,
  imports: [CommonModule,    FormsModule,    MenuComponent,    IonHeader,    
        IonToolbar,    IonButtons,    IonMenuButton,    IonTitle,    IonContent,
        IonItem,    IonLabel,    IonInput,    IonSelect,    IonSelectOption,IonIcon,
      IonCard,  IonCardContent,  IonButton,ReactiveFormsModule,IonToggle]})
export class CatActualizarPage implements OnInit {

  categoriaForm!: FormGroup;
  categoriaId!: string;
  docId!: string; // 🔑 id REAL del documento

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.categoriaId = this.route.snapshot.paramMap.get('categoriaId')!;

    this.categoriaForm = this.fb.group({
      categoriaId: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: [''],
      imagenUrl: ['', Validators.required],
      activo: [true]
    });

    await this.cargarCategoria();
  }

  async cargarCategoria() {
    const ref = collection(this.firestore, 'categoria');
    const q = query(ref, where('categoriaId', '==', this.categoriaId));

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];

      this.docId = docSnap.id; // 🔥 GUARDAMOS EL ID REAL
      this.categoriaForm.patchValue(docSnap.data());
    }
  }

  async actualizar() {
    if (!this.docId) return;

    const ref = doc(this.firestore, `categoria/${this.docId}`);

    await updateDoc(ref, {
      ...this.categoriaForm.getRawValue()
    });
  }
}