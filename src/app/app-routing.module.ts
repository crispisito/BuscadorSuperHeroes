import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarHeroeComponent } from './components/editar-heroe/editar-heroe.component';
import { ListaComponent } from './components/lista/lista.component';
import { NuevoHeroeComponent } from './components/nuevo-heroe/nuevo-heroe.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/lista' },
  { path: 'lista', component: ListaComponent },
  { path: 'editar/:id', component: EditarHeroeComponent },
  { path: 'nuevo-heroe', component: NuevoHeroeComponent },
  { path: '**', redirectTo: '/lista' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
