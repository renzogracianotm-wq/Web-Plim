import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader,  IonToolbar,  IonButtons,  IonMenuButton,  IonTitle,  IonContent,
  IonItem,  IonLabel,  IonInput,  IonCard,  IonCardContent,  IonButton} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { Firestore, collection,collectionData, query, where,getDocs,updateDoc,doc,deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-prod-buscar',
  templateUrl: './prod-buscar.page.html',
  styleUrls: ['./prod-buscar.page.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,

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
    IonButton]
})
export class ProdBuscarPage implements OnInit {

  productos: any[] = [];
  productosFiltrados: any[] = [];
  busqueda: string = '';

  constructor(
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    const ref = collection(this.firestore, 'producto');

    collectionData(ref, { idField: 'docId' }).subscribe((data: any[]) => {
      this.productos = data;
      this.productosFiltrados = data;
    });
  }

  buscar() {
    const val = this.busqueda.toLowerCase();

    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(val) ||
      p.categoriaId.toLowerCase().includes(val)
    );
  }

  editar(productoId: string) {
  // Navega a prodActualizar pasando el productoId
  this.router.navigate(['/prod-actualizar', productoId]);
}

  async eliminar(docId: string) {
    const ref = doc(this.firestore, `producto/${docId}`);
    await deleteDoc(ref);
    this.cargarProductos(); // refresca la lista
  }
}
