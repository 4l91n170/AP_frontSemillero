import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormularioDocenteComponent } from './Componentes/formulario-docente/formulario-docente.component';
import { FormularioEstudianteComponent } from './Componentes/formulario-estudiante/formulario-estudiante.component';
import { PopAlertaComponent } from './Componentes/pop-alerta/pop-alerta.component';
import { PopErrorComponent } from './Componentes/pop-error/pop-error.component';
import { PopExitosoComponent } from './Componentes/pop-exitoso/pop-exitoso.component';
import { QRCodeComponent } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    FormularioDocenteComponent,
    FormularioEstudianteComponent,
    PopAlertaComponent,
    PopErrorComponent,
    PopExitosoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
