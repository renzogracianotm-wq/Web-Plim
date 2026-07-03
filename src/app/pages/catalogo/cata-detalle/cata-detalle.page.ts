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

  imagenPrincipal: string = '';
  imagenActiva: string = '';

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
      this.imagenPrincipal = this.producto.imagenes?.[0] ?? '';
      this.imagenActiva = this.imagenPrincipal;
      this.cargarRelacionados();
    }
  }

  // 🔥 AGREGAR AL CARRITO
  agregar() {

    const uid = this.auth.currentUser?.uid;

    if (!uid) {
      alert('Debe iniciar sesión');
      return;
    }

    let carrito = JSON.parse(
      localStorage.getItem(`carrito_${uid}`) || '[]'
    );

    const productId = this.producto.docId || this.producto.id;

    const index = carrito.findIndex(
      (item: any) => item.id === productId
    );

    if (index !== -1) {
      carrito[index].cantidad =
        (carrito[index].cantidad || 1) + 1;
    } else {
      carrito.push({
        id: productId,
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        stock: this.producto.stock,
        categoriaId: this.producto.categoriaId,
        imagenes: Array.isArray(this.producto.imagenes)
          ? this.producto.imagenes
          : [],
        cantidad: 1
      });
    }

    localStorage.setItem(
      `carrito_${uid}`,
      JSON.stringify(carrito)
    );

    this.router.navigate(['/car-compra']);
  }

  // 🔥 RELACIONADOS
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

  // 🔥 VER PRODUCTO RELACIONADO
  verRelacionado(producto: any) {

    this.producto = producto;

    this.imagenPrincipal = producto.imagenes?.[0] ?? '';
    this.imagenActiva = this.imagenPrincipal;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.cargarRelacionados();
  }

  // 🔥 CAMBIAR IMAGEN
  cambiarImagen(img: string) {
    this.imagenPrincipal = img;
    this.imagenActiva = img;
  }

  eliminar(){}
}