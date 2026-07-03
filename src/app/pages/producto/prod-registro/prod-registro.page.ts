import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  IonHeader,  IonToolbar,  IonButtons,  IonMenuButton,  IonTitle,  IonContent,  IonItem,  IonLabel,  IonInput,  
  IonSelect,  IonSelectOption,  IonCard,  IonCardContent,  IonButton,  IonToggle,} from '@ionic/angular/standalone';
import { Firestore, collection, addDoc, query, where,getDocs,collectionData,updateDoc,doc } from '@angular/fire/firestore';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-prod-registro',
  templateUrl: './prod-registro.page.html',
  styleUrls: ['./prod-registro.page.scss'],
  standalone: true,
  imports: [CommonModule,    FormsModule,    ReactiveFormsModule,
    IonHeader,    IonToolbar,    IonButtons,    IonMenuButton,    IonTitle,    IonContent,    IonItem,    IonLabel,    
    IonInput,    IonSelect,    IonSelectOption,    IonCard,    IonCardContent,    IonButton,    IonToggle] })

export class ProdRegistroPage implements OnInit {
  categorias: any[] = [];

  selectedFiles: File[] = [];
  subiendo = false;
  previewUrls: string[] = [];
  // 🔹 Reemplaza por tu Cloud Name
  private readonly CLOUD_NAME = 'dahefh6aq';

  // 🔹 Reemplaza por el nombre de tu Upload Preset
  private readonly UPLOAD_PRESET = 'minimoda_upload';

  productoForm = this.fb.group({
    productoId: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: [''],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoriaId: ['', Validators.required], // 🔑 guarda ID REAL
    imagenes: this.fb.control<string[]>([]),

    activo: [true]    
  });

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    
  }

  cargarCategorias() {
    const ref = collection(this.firestore, 'categoria');
    const q = query(ref, where('activo', '==', true));

    collectionData(q).subscribe(data => {
      this.categorias = data;
    });
  }

  onFilesSelected(event: any) {

  this.selectedFiles = Array.from(event.target.files);

  this.previewUrls = this.selectedFiles.map(file =>
    window.URL.createObjectURL(file)
  );

}

  async subirImagenes(): Promise<string[]> {

  const urls: string[] = [];

  for (const file of this.selectedFiles) {

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', this.UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await response.json();

    urls.push(data.secure_url);

  }

  return urls;
}

  async registrar() {

  console.log('Entró al método registrar');

  if (this.productoForm.invalid) {

  console.log('Formulario inválido');

  Object.keys(this.productoForm.controls).forEach(key => {

    const control = this.productoForm.get(key);

    console.log(
      key,
      'valor:',
      control?.value,
      'errores:',
      control?.errors
    );

  });

  return;
}

  if (this.selectedFiles.length === 0) {
    console.log('No hay imágenes');
    return;
  }

  try {

    console.log('Subiendo imágenes...');

    const imagenes = await this.subirImagenes();

    console.log(imagenes);

    this.productoForm.patchValue({
      imagenes: imagenes
    });

    console.log(this.productoForm.value);

    await addDoc(
      collection(this.firestore, 'producto'),
      this.productoForm.value
    );

    console.log('Producto registrado');

// Limpiar formulario
this.productoForm.reset({
  productoId: '',
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  categoriaId: '',
  imagenes: [],
  activo: true
});

// Limpiar imágenes
this.selectedFiles = [];
this.previewUrls = [];
this.fileInput.nativeElement.value = '';

// Ya no está subiendo
this.subiendo = false;

  } catch (error) {

    console.error(error);

  }
console.log(this.productoForm.value);
}

@ViewChild('fileInput')
fileInput!: ElementRef<HTMLInputElement>;

}