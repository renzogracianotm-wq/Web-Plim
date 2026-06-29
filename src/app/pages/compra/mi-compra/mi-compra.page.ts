import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon } from '@ionic/angular/standalone';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-mi-compra',
  templateUrl: './mi-compra.page.html',
  styleUrls: ['./mi-compra.page.scss'],
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
    IonCardContent,
    IonIcon, CommonModule, FormsModule]
})
export class MiCompraPage implements OnInit {

  compras: any[] = [];

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.cargarCompras();
  }

  cargarCompras() {

    const uid = this.auth.currentUser?.uid;

    if (!uid) return;

    const comprasRef = collection(this.firestore, 'carrito');

    const q = query(
      comprasRef,
      where('uid', '==', uid)
    );

    collectionData(q, { idField: 'id' })
      .subscribe(data => {
        this.compras = data;
      });
  }

}