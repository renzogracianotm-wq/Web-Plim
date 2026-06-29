import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader,  IonToolbar,  IonButtons,  IonBackButton,  IonTitle,  IonContent,  IonCard,  
  IonCardContent,  IonCardHeader,  IonCardTitle,  IonButton,IonItem,    IonLabel,   IonThumbnail} from '@ionic/angular/standalone';
import { IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import {  Firestore,  collection,  collectionData,  query,  where} from '@angular/fire/firestore';
@Component({
  selector: 'app-cata-detalle',
  templateUrl: './cata-detalle.page.html',
  styleUrls: ['./cata-detalle.page.scss'],
  standalone: true,
   imports: [
    CommonModule,
    FormsModule,
    MenuComponent,

    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,

    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonThumbnail
  ]
})
export class CataDetallePage implements OnInit {

  producto: any;
  productosRelacionados: any[] = [];

  constructor(
  private router: Router,
  private auth: Auth,
  private firestore: Firestore
  ) {
  const nav = this.router.getCurrentNavigation();

  if (nav?.extras?.state) {
    this.producto = nav.extras.state['producto'];
    } 
  }

  ngOnInit() {
    if (this.producto) {
    this.cargarRelacionados();
  }
  }

  // botones sin funcionalidad por ahora
  agregar() {

  const uid = this.auth.currentUser?.uid;

  if (!uid) {
    alert('Debe iniciar sesión');
    return;
  }

  let carrito = JSON.parse(
    localStorage.getItem(`carrito_${uid}`) || '[]'
  );

  // Verificar si el producto ya existe
  const index = carrito.findIndex(
    (item: any) =>
      (item.docId || item.id) ===
      (this.producto.docId || this.producto.id)
  );

  if (index !== -1) {
    carrito[index].cantidad =
      (carrito[index].cantidad || 1) + 1;
  } else {
    carrito.push({
      ...this.producto,
      cantidad: 1
    });
  }

  localStorage.setItem(
    `carrito_${uid}`,
    JSON.stringify(carrito)
  );

  this.router.navigate(['/car-compra']);
}
  eliminar() {}
  cargarRelacionados() {

  const ref = collection(this.firestore, 'producto');

  const q = query(
    ref,
    where('activo', '==', true),
    where('categoriaId', '==', this.producto.categoriaId)
  );

  collectionData(q, { idField: 'docId' }).subscribe((data: any[]) => {

    this.productosRelacionados = data
      .filter(p => p.docId !== this.producto.docId)
      .slice(0, 4);

  });

}

verRelacionado(producto: any) {

  this.producto = producto;

  // limpiar scroll arriba tipo Amazon
  window.scrollTo({ top: 0, behavior: 'smooth' });

  this.cargarRelacionados();
}

}