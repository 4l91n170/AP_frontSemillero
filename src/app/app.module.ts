import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormularioDocenteComponent } from './Componentes/formulario-docente/formulario-docente.component';
import { FormularioEstudianteComponent } from './Componentes/formulario-estudiante/formulario-estudiante.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioDocenteComponent,
    FormularioEstudianteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
