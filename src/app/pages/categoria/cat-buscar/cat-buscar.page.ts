import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader,  IonToolbar,  IonButtons,  IonMenuButton,  IonTitle,  IonContent,  IonItem,
  IonLabel,  IonInput,  IonSelect,  IonSelectOption,IonIcon,
    IonCard,  IonCardContent,  IonButton, } from '@ionic/angular/standalone';

import { Firestore, collection,collectionData, query, where,getDocs,updateDoc,doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-cat-buscar',
  templateUrl: './cat-buscar.page.html',
  styleUrls: ['./cat-buscar.page.scss'],
  standalone: true,
  imports: [CommonModule,    FormsModule,    MenuComponent,    IonHeader,    
      IonToolbar,    IonButtons,    IonMenuButton,    IonTitle,    IonContent,
      IonItem,    IonLabel,    IonInput,    IonSelect,    IonSelectOption,IonIcon,
    IonCard,  IonCardContent,  IonButton]})
export class CatBuscarPage implements OnInit {

  categorias: any[] = [];
  categoriasFiltradas: any[] = [];
  textoBuscar = '';

  constructor(
  private firestore: Firestore,
  private router: Router
) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    const ref = collection(this.firestore, 'categoria');

    collectionData(ref, { idField: 'docId' }).subscribe(data => {
      this.categorias = data.filter((c: any) => c.activo === true);
      this.filtrar();
    });
  }

  filtrar() {
    const texto = this.textoBuscar.toLowerCase();

    this.categoriasFiltradas = this.categorias.filter(cat =>
      cat.nombre.toLowerCase().includes(texto) ||
      cat.descripcion.toLowerCase().includes(texto) ||
      cat.categoriaId.toLowerCase().includes(texto)
    );
  }

  editar(categoriaId: string) {
  this.router.navigate(['/cat-actualizar', categoriaId]);
}


  eliminar(docId: string) {
    updateDoc(doc(this.firestore, `categoria/${docId}`), {
      activo: false
    });
  }
  
}
