import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cat-eliminar',
  templateUrl: './cat-eliminar.page.html',
  styleUrls: ['./cat-eliminar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CatEliminarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
