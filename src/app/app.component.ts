import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  const themes = ['theme-pink', 'theme-blue', 'theme-dark'];
  const savedTheme = localStorage.getItem('theme') || 'theme-pink';
  document.body.classList.remove(...themes);
  document.body.classList.add(savedTheme);
}

  setTheme(theme: string) {
    document.body.classList.remove(
      'theme-pink',
      'theme-blue',
      'theme-dark'
    );

    document.body.classList.add(theme);

    localStorage.setItem('theme', theme);
  }
}
