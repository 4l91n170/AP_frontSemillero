import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioEstudianteComponent } from './Componentes/formulario-estudiante/formulario-estudiante.component';
import { FormularioDocenteComponent } from './Componentes/formulario-docente/formulario-docente.component';

const routes: Routes = [  { 
    path: 'formulario/:idQr', 
    component: FormularioEstudianteComponent 
  },
  { path: 'GenerarQr', component: FormularioDocenteComponent },  // Ruta /home
  { path: '', redirectTo: '/GenerarQr', pathMatch: 'full' },
  { 
    path: ':idQr', 
    redirectTo: 'formulario/:idQr', 
    pathMatch: 'full' 
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
