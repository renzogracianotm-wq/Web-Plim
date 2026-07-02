import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { Firestore, collection,collectionData, query, where,getDocs,updateDoc,doc } from '@angular/fire/firestore';
import {  IonHeader,  IonToolbar,  IonButtons,  IonMenuButton,  IonTitle,  IonContent,  IonItem,
  IonLabel,  IonInput,  IonSelect,  IonSelectOption, IonButton,IonIcon,IonSearchbar } from '@ionic/angular/standalone';
import { Router,RouterModule } from '@angular/router';
@Component({
  selector: 'app-cata-ver',
  templateUrl: './cata-ver.page.html',
  styleUrls: ['./cata-ver.page.scss'],
  standalone: true,
  imports: [CommonModule,    FormsModule,    MenuComponent,    IonHeader,    
    IonToolbar,    IonButtons,    IonMenuButton,    IonTitle,    IonContent,
    IonItem,    IonLabel,    IonInput,    IonSelect, IonSelectOption,IonButton,IonIcon,IonSearchbar, RouterModule]})
export class CataVerPage implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];

  categorias: any[] = [];
  categoriasVisibles: any[] = [];

  indiceCategoria = 0;

  busqueda: string = '';
  categoriaSeleccionada: string = '';

  constructor(private firestore: Firestore, private router: Router) {
    
  }

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
  cargarProductos() {
    const ref = collection(this.firestore, 'producto');
    const q = query(ref, where('activo', '==', true));
    collectionData(q, { idField: 'docId' }).subscribe((data: any[]) => {
      this.productos = data;
      this.filtrarProductos();
    });
  }

  cargarCategorias() {
    const ref = collection(this.firestore, 'categoria');
    const q = query(
      ref,
      where('activo', '==', true)
    );
    collectionData(q, { idField: 'docId' })
      .subscribe((data: any[]) => {
        this.categorias = data;
        this.actualizarCategorias();
      });
  }
  
   actualizarCategorias() {

    this.categoriasVisibles =      this.categorias.slice(
        this.indiceCategoria,
        this.indiceCategoria + 6
      );

  }

  siguienteCategoria() {
  if (this.indiceCategoria + 6 < this.categorias.length) {
    this.indiceCategoria += 6;
    this.actualizarCategorias();
  }
}

  anteriorCategoria() {
  if (this.indiceCategoria > 0) {
    this.indiceCategoria -= 6;
    if (this.indiceCategoria < 0) {
      this.indiceCategoria = 0;
    }
    this.actualizarCategorias();
  }
}

  seleccionarCategoria(categoria: any) {

    this.categoriaSeleccionada = categoria.categoriaId;

    this.filtrarProductos();

  }

  mostrarTodasCategorias() {

    this.categoriaSeleccionada = '';

    this.filtrarProductos();

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

