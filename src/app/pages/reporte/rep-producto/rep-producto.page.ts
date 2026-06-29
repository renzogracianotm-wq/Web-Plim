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
  IonCardContent } from '@ionic/angular/standalone';
import { Firestore, collection, addDoc, query, where,getDocs,collectionData,updateDoc,doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-rep-producto',
  templateUrl: './rep-producto.page.html',
  styleUrls: ['./rep-producto.page.scss'],
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
    IonCardContent, CommonModule, FormsModule]
})
export class RepProductoPage implements OnInit {

  productosBajoStock: any[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.obtenerProductosBajoStock();
  }

  obtenerProductosBajoStock() {
    const prodRef = collection(this.firestore, 'producto');
    const q = query(prodRef, where('stock', '<', 10));
    collectionData(q, { idField: 'docId' }).subscribe(data => {
      this.productosBajoStock = data;
    });
  }

}