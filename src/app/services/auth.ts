import { Injectable , inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  registrarUsuario(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  fusionarCarrito(uid: string) {

    const guestKey = 'carrito_guest';
    const userKey = `carrito_${uid}`;

    const guest = JSON.parse(
      localStorage.getItem(guestKey) || '[]'
    );

    // Si no hay carrito de invitado, salir
    if (guest.length === 0) return;

    const user = JSON.parse(
      localStorage.getItem(userKey) || '[]'
    );

    guest.forEach((producto: any) => {

      const index = user.findIndex(
        (p: any) => p.id === producto.id
      );

      if (index >= 0) {

        user[index].cantidad = Math.min(
          user[index].stock,
          user[index].cantidad + producto.cantidad
        );

      } else {

        user.push(producto);

      }

    });

    localStorage.setItem(
      userKey,
      JSON.stringify(user)
    );

    localStorage.removeItem(guestKey);

  }
}
