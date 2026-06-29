import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton } from '@ionic/angular/standalone';
import { Firestore, collection,collectionData, query, where,getDoc,updateDoc,doc ,addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-car-compra',
  templateUrl: './car-compra.page.html',
  styleUrls: ['./car-compra.page.scss'],
  standalone: true,
  imports: [IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton, CommonModule, FormsModule]
})
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

  cargarCarrito() {

  const uid = this.auth.currentUser?.uid;

  if (!uid) {
    this.carrito = [];
    this.total = 0;
    return;
  }

  this.carrito = JSON.parse(
    localStorage.getItem(`carrito_${uid}`) || '[]'
  );

  this.carrito.forEach(p => {
    if (!p.cantidad) p.cantidad = 1;
  });

  this.actualizarTotal();
}

  aumentarCantidad(producto: any) {
    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.guardarCarrito();
    }
  }

  disminuirCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.guardarCarrito();
    }
  }

  guardarCarrito() {

  const uid = this.auth.currentUser?.uid;

  if (!uid) return;

  localStorage.setItem(
    `carrito_${uid}`,
    JSON.stringify(this.carrito)
  );

  this.actualizarTotal();
}

  actualizarTotal() {
    this.total = this.carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  }

  async comprar() {
    const carritoRef = collection(this.firestore, 'carrito');

    for (let producto of this.carrito) {

      // 1️⃣ Registrar compra en carrito
      await addDoc(carritoRef, {
        uid: this.auth.currentUser?.uid,
        productoId: producto.docId || producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
        stock: producto.stock,
        categoriaId: producto.categoriaId,
        imagenUrl: producto.imagenUrl,
        fecha: serverTimestamp()
      });

      // 2️⃣ Actualizar stock en colección productos
      const prodRef = doc(this.firestore, `producto/${producto.docId || producto.id}`);
      const prodSnap = await getDoc(prodRef);

      if (prodSnap.exists()) {
        const data = prodSnap.data() as any;
        let nuevoStock = data.stock - producto.cantidad;

        await updateDoc(prodRef, {
          stock: nuevoStock,
          activo: nuevoStock > 0 ? true : false
        });
      }
    }

    // Limpiar carrito local
    const uid = this.auth.currentUser?.uid;

if (uid) {
  localStorage.removeItem(`carrito_${uid}`);
}
    this.carrito = [];
    this.total = 0;
    alert('Compra registrada y stock actualizado!');
  }

  eliminar(index: number) {
    this.carrito.splice(index, 1);
    this.guardarCarrito();
  }
}
