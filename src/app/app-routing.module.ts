import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioEstudianteComponent } from './Componentes/formulario-estudiante/formulario-estudiante.component';

const routes: Routes = [{ path: ':id', component: FormularioEstudianteComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
