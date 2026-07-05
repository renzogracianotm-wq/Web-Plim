import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader,  IonToolbar,  IonButtons,  IonMenuButton,  IonTitle,  IonContent,  IonCard,  
  IonCardHeader,  IonCardTitle,  IonCardSubtitle,  IonCardContent,  IonButton } from '@ionic/angular/standalone';
import { Firestore, collection,collectionData, query, where,getDoc,updateDoc,doc ,addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-car-compra',
  templateUrl: './car-compra.page.html',
  styleUrls: ['./car-compra.page.scss'],
  standalone: true,
  imports: [IonHeader,    IonToolbar,    IonButtons,    IonMenuButton,    IonTitle,
    IonContent,    IonCard,    IonCardHeader,    IonCardTitle,    IonCardSubtitle, 
    IonCardContent,    IonButton, CommonModule, FormsModule]})
export class CarCompraPage implements OnInit {

   carrito: any[] = [];
  total: number = 0;
  

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  ngOnInit() {
  this.cargarCarrito();
  }

  private getCarritoKey(): string {
    const uid = this.auth.currentUser?.uid;
    return uid ? `carrito_${uid}` : 'carrito_guest';
  }

  // 🔥 CARGAR CARRITO
  cargarCarrito() {

    this.carrito = JSON.parse(
      localStorage.getItem(this.getCarritoKey()) || '[]'
    );

    this.carrito = this.carrito.map((p: any) => ({
      ...p,
      cantidad: p.cantidad || 1
    }));

    this.actualizarTotal();

  }

  // 🔥 AUMENTAR
  aumentarCantidad(producto: any) {

    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.guardarCarrito();
    }
  }

  // 🔥 DISMINUIR
  disminuirCantidad(producto: any) {

    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.guardarCarrito();
    }
  }

  // 🔥 GUARDAR LOCALSTORAGE
  guardarCarrito() {

  localStorage.setItem(
    this.getCarritoKey(),
    JSON.stringify(this.carrito)
  );

  this.actualizarTotal();

  }

  // 🔥 TOTAL
  actualizarTotal() {

    this.total = this.carrito.reduce(
      (sum, p) =>
        sum + (p.precio || 0) * (p.cantidad || 1),
      0
    );
  }

  // 🔥 COMPRAR
  async comprar() {

    const uid = this.auth.currentUser?.uid;
    if (!uid) {
  alert('Debes iniciar sesión para realizar la compra');
  return;
  }

    const comprasRef = collection(this.firestore, 'compras');

    for (let producto of this.carrito) {

      const productId = producto.id;

      // guardar compra
      await addDoc(comprasRef, {
        uid,
        productoId: productId,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
        stock: producto.stock,
        categoriaId: producto.categoriaId,
        imagenes: Array.isArray(producto.imagenes)
          ? producto.imagenes
          : [],
        fecha: serverTimestamp(),
        estado: 'pendiente'
      });

      // actualizar stock producto
      const prodRef = doc(
        this.firestore,
        `producto/${productId}`
      );

      const prodSnap = await getDoc(prodRef);

      if (prodSnap.exists()) {

        const data = prodSnap.data() as any;

        const nuevoStock = Math.max(
          0,
          data.stock - producto.cantidad
        );

        await updateDoc(prodRef, {
          stock: nuevoStock,
          activo: nuevoStock > 0
        });
      }
    }

    // limpiar carrito
    localStorage.removeItem(this.getCarritoKey());

    this.carrito = [];
    this.total = 0;

    alert('Compra registrada y stock actualizado!');
  }

  // 🔥 ELIMINAR ITEM
  eliminar(index: number) {

    this.carrito.splice(index, 1);
    this.guardarCarrito();
  }

  ionViewWillEnter() {
  this.cargarCarrito();
}
}
