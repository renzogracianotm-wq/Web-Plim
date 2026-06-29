import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { Firestore, collection,collectionData, query, where,getDocs,updateDoc,doc } from '@angular/fire/firestore';
import {  IonHeader,  IonToolbar,  IonButtons,  IonMenuButton,  IonTitle,  IonContent,  IonItem,
  IonLabel,  IonInput,  IonSelect,  IonSelectOption } from '@ionic/angular/standalone';

import { Router } from '@angular/router';
@Component({
  selector: 'app-cata-ver',
  templateUrl: './cata-ver.page.html',
  styleUrls: ['./cata-ver.page.scss'],
  standalone: true,
  imports: [CommonModule,    FormsModule,    MenuComponent,    IonHeader,    
    IonToolbar,    IonButtons,    IonMenuButton,    IonTitle,    IonContent,
    IonItem,    IonLabel,    IonInput,    IonSelect,    IonSelectOption]})
export class CataVerPage implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  categorias: any[] = [];
  busqueda: string = '';
  categoriaSeleccionada: string = '';

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarProductos();
  }

  verDetalle(producto: any) {
  // pasamos todo el producto como parámetro serializado en URL
  this.router.navigate(['/cata-detalle'], {
    state: { producto }
  });
}

  cargarCategorias() {
    const ref = collection(this.firestore, 'categoria');
    const q = query(ref, where('activo', '==', true));
    collectionData(q).subscribe(data => {
      this.categorias = data;
    });
  }

  cargarProductos() {
    const ref = collection(this.firestore, 'producto');
    const q = query(ref, where('activo', '==', true));
    collectionData(q, { idField: 'docId' }).subscribe((data: any[]) => {
      this.productos = data;
      this.filtrarProductos();
    });
  }

  filtrarProductos() {
    const val = this.busqueda.toLowerCase();

    this.productosFiltrados = this.productos.filter(p => {
      const matchesNombre = p.nombre.toLowerCase().includes(val);
      const matchesCategoria = this.categoriaSeleccionada
        ? p.categoriaId === this.categoriaSeleccionada
        : true;
      return matchesNombre && matchesCategoria;
    });
  }

  onBusquedaChange() {
    this.filtrarProductos();
  }

  onCategoriaChange() {
    this.filtrarProductos();
  }  

}

