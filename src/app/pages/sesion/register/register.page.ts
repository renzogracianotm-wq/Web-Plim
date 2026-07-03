import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import {  FormBuilder,  FormGroup,  ReactiveFormsModule,  Validators} from '@angular/forms';
import {  IonContent,  IonCard,  IonItem,  IonLabel,    IonInput,  IonButton} from '@ionic/angular/standalone';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [    CommonModule,    ReactiveFormsModule,
    IonContent,    IonCard,    IonItem,    IonLabel,
    IonInput,    IonButton
  ]
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  passwordsIguales(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { noCoinciden: true };
  }

  registrarUsuario() {

    if (this.registerForm.invalid) {
      alert('Complete todos los campos correctamente.');
      return;
    }

    const { nombre, correo, password } = this.registerForm.value;

    this.loading = true;

    this.authService.registrarUsuario(correo, password)
      .then(async (userCredential: any) => {

        const uid = userCredential.user.uid;

        // 🔥 guardar perfil en Firestore
        await setDoc(doc(this.firestore, 'users', uid), {
          nombre,
          correo,
          rol: 'cliente',
          fecha: new Date()
        });

        alert('Usuario registrado correctamente!');
        this.router.navigate(['/login']);

      })
      .catch(error => {
        console.log(error);
        alert('Error al registrar: ' + error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}