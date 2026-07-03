import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/sesion/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/sesion/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'cata-ver',
    loadComponent: () => import('./pages/catalogo/cata-ver/cata-ver.page').then( m => m.CataVerPage)
  },
  {
    path: 'cata-detalle',
    loadComponent: () => import('./pages/catalogo/cata-detalle/cata-detalle.page').then( m => m.CataDetallePage)
  },
  {
    path: 'cat-buscar',
    loadComponent: () => import('./pages/categoria/cat-buscar/cat-buscar.page').then( m => m.CatBuscarPage)
  },
  {
    path: 'cat-actualizar',
    loadComponent: () => import('./pages/categoria/cat-actualizar/cat-actualizar.page').then( m => m.CatActualizarPage)
  },
  {
    path: 'cat-eliminar',
    loadComponent: () => import('./pages/categoria/cat-eliminar/cat-eliminar.page').then( m => m.CatEliminarPage)
  },
  {
    path: 'cat-registro',
    loadComponent: () => import('./pages/categoria/cat-registro/cat-registro.page').then( m => m.CatRegistroPage)
  },
  {
    path: 'prod-actualizar',
    loadComponent: () => import('./pages/producto/prod-actualizar/prod-actualizar.page').then( m => m.ProdActualizarPage)
  },
  {
    path: 'prod-buscar',
    loadComponent: () => import('./pages/producto/prod-buscar/prod-buscar.page').then( m => m.ProdBuscarPage)
  },
  {
    path: 'prod-registro',
    loadComponent: () => import('./pages/producto/prod-registro/prod-registro.page').then( m => m.ProdRegistroPage)
  },
  {
    path: 'car-compra',
    loadComponent: () => import('./pages/carrito/car-compra/car-compra.page').then( m => m.CarCompraPage)
  },
  {
    path: 'mi-compra',
    loadComponent: () => import('./pages/compra/mi-compra/mi-compra.page').then( m => m.MiCompraPage)
  },
  {
    path: 'rep-producto',
    loadComponent: () => import('./pages/reporte/rep-producto/rep-producto.page').then( m => m.RepProductoPage)
  },
  {
    path: 'per-temas',
    loadComponent: () => import('./pages/perfil/per-temas/per-temas.page').then( m => m.PerTemasPage)
  },
  {
    path: 'per-usu',
    loadComponent: () => import('./pages/perfil/per-usu/per-usu.page').then( m => m.PerUsuPage)
  },
];
