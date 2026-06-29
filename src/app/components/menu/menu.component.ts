import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // necesario para routerLink
import {

  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,

  IonList,
  IonItem,
  IonLabel,
  IonIcon,

  IonAccordion,
  IonAccordionGroup
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  cartSharp,
  bagSharp,
  addCircleSharp,
  gridSharp,
  fileTraySharp,
  fileTrayStackedSharp,
  arrowBackSharp,
  alertCircleSharp,
  appsSharp,
  personSharp,
  personCircleSharp,
  receiptSharp,
  colorPaletteSharp
} from 'ionicons/icons';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [RouterModule,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,

  IonList,
  IonItem,
  IonLabel,
  IonIcon,

  IonAccordion,
  IonAccordionGroup],
  standalone: true,
})
export class MenuComponent  implements OnInit {

  constructor() {
    addIcons({
      homeOutline,
      cartSharp,
      bagSharp,
      addCircleSharp,
      gridSharp,
      fileTraySharp,
      fileTrayStackedSharp,
      arrowBackSharp,
      alertCircleSharp,
      appsSharp,
      personSharp,
      personCircleSharp,
      receiptSharp,
      colorPaletteSharp
    });
  }


  ngOnInit() {}

}
