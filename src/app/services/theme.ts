import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  setTheme(theme: string) {
    const themes = ['theme-pink', 'theme-blue', 'theme-dark'];

    document.body.classList.remove(...themes);
    document.body.classList.add(theme);
    console.log('Tema aplicado:', theme);
    localStorage.setItem('theme', theme);
  }

  loadTheme() {
    const saved = localStorage.getItem('theme') || 'theme-pink';

    document.body.classList.remove(
      'theme-pink',
      'theme-blue',
      'theme-dark'
    );

    document.body.classList.add(saved);
  }
}