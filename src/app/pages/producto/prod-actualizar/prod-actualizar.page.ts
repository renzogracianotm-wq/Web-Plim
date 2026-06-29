import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';
import { IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonCardContent,
  IonButton,
  IonToggle } from '@ionic/angular/standalone';
import { Firestore, collection,collectionData, query, where,getDocs,updateDoc,doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-prod-actualizar',
  templateUrl: './prod-actualizar.page.html',
  styleUrls: ['./prod-actualizar.page.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,

    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonCard,
    IonCardContent,
    IonButton,
    IonToggle]
})
export class ProdActualizarPage implements OnInit {

  productoForm!: FormGroup;
  productoId!: string;
  docId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    this.productoId = this.route.snapshot.paramMap.get('productoId')!;

    this.productoForm = this.fb.group({
      productoId: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoriaId: ['', Validators.required],
      imagenUrl: ['', Validators.required],
      activo: [true]
    });

    await this.cargarProducto();
  }

  async cargarProducto() {
    const ref = collection(this.firestore, 'producto');
    const q = query(ref, where('productoId', '==', this.productoId));

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      this.docId = docSnap.id; // id real de Firestore
      this.productoForm.patchValue(docSnap.data());
    }
  }

  async actualizar() {
    if (!this.docId) return;

    const ref = doc(this.firestore, `producto/${this.docId}`);
    await updateDoc(ref, {
      ...this.productoForm.getRawValue()
    });
  }
}
