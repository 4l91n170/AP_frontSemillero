import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { ServiceDocenteService } from '../../Servicios/service-docente.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Asignaturas, datosDocente, datosFormularioAsistencia, Programa, Qr } from '../../Models/datos.model';
import { QRCodeComponent } from 'angularx-qrcode';
import { ServiceModalDocenteService } from '../../Servicios/service-modal-docente.service';

@Component({
  selector: 'app-formulario-docente',
  standalone: false,
  templateUrl: './formulario-docente.component.html',
  styleUrl: './formulario-docente.component.css'
})
export class FormularioDocenteComponent implements OnInit {
  // Inyectable del servicio
  private _serviceDocente = inject(ServiceDocenteService);
  private _serviceModal = inject(ServiceModalDocenteService)
  
  // Constructor del formulario, contiene los validadores.
  formularioDocente: FormGroup
  constructor(private form: FormBuilder){this.formularioDocente = this.form.group({
    cedulaProfesor: ['',Validators.required],
    idPrograma: ['',Validators.required],
    idAsignatura: ['',Validators.required],
   
  })}
  // Funcion error, para que detecte el sitio si esta en blanco con un click o touch
  error(controlname:string, errortype: string){
    return this.formularioDocente.get(controlname)?.hasError(errortype)&& this.formularioDocente.get(controlname)?.touched
  
  }
  
  // funciones API
  
  generacionQr: string = ""
  asignaturaList: Asignaturas [] = []
  programasList: Programa [] = []
  onProgramaChange(event: any) {
    const idPrograma = Number(event.target.value);
    if (idPrograma) {
        this._serviceDocente.getDatosAsignatura(idPrograma).subscribe({
            next: (response: { code: number; message: string; data: Asignaturas[] }) => {
                if (response.code === 200 && response.data) {
                    this.asignaturaList = response.data;
                    }
            },
            error: (err) => console.error('Error:', err)
        });
    } else {
        this.asignaturaList = []; 
    }
}
  ngOnInit(): void {
   this._serviceDocente.getDatosPrograma().subscribe({
      next: (response: { code: number; message: string; data: Programa []  }) => {
        if (response.code === 200 && response.data) {
          this.programasList = response.data;
        }
      },
      error: (err) => console.error('Error:', err)
    });
  
  }
// Generacion QR
private _qrCode: string = ""
public get qrCode(): string{
  return this._qrCode
}
// Modal
mensajeAlert: boolean = false
tipoModal(){
  this.mensajeAlert = true
}
 // Funcion del boton
 datosEnviadosDocente?: datosDocente  
 onSumbit(){
    if(this.formularioDocente.valid){
        this.datosEnviadosDocente = this.formularioDocente.value
      
        //post QR
      
        this._serviceDocente.postCreateQr(this.datosEnviadosDocente).subscribe({
          next: (response: { code: number; message: string; data: any  }) => {
            if (response.code === 200 && response.data) {
              this.generacionQr = response.data.idQr
              this._qrCode = this.generacionQr
              this._serviceModal.showSuccessPopup('Código QR Generado con Éxito')
              }
          },
           error: (error) => {
          console.error('Error al enviar datos:', error);
          // Mostrar popup de error
          this._serviceModal.showErrorPopup("Error al enviar los datos: " + (error.message || "Intente nuevamente"));
        }
          
        });
      this.formularioDocente.reset()
      
     
   }
   else{
      this._serviceModal.showAlertPopup("Por favor llene todos los datos requeridos");
       }
 }
}
  

