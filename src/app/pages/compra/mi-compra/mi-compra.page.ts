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
import { Firestore, collection, collectionData, query, where,orderBy } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@angular/fire/auth';

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
    onAuthStateChanged(this.auth, (user) => {
    if (user) {
      this.cargarCompras(user.uid);
    } else {
      this.compras = [];
    }
  });
  }

  cargarCompras(uid: string) {

  const ref = collection(this.firestore, 'compras');

  const q = query(
    ref,
    where('uid', '==', uid),
    orderBy('fecha', 'desc')
  );

  collectionData(q, { idField: 'id' })
    .subscribe(data => {
      console.log('COMPRAS:', data); // 🔥 DEBUG
      this.compras = data;
    });
  }

}