import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupType, ServiceModalDocenteService } from '../../Servicios/service-modal-docente.service';
declare var bootstrap: any;
@Component({
  selector: 'app-pop-exitoso',
  standalone: false,
  templateUrl: './pop-exitoso.component.html',
  styleUrl: './pop-exitoso.component.css'
})
export class PopExitosoComponent {
 textoExito= '';
  mostrarModal = false;
  private subscription: Subscription = new Subscription();
  
  constructor(public _serviceModalDocente: ServiceModalDocenteService) {}
  
  ngOnInit() {
    this.subscription = this._serviceModalDocente.popupState$.subscribe(state => {
      if (state.show && state.type === PopupType.EXITO) {
        this.textoExito = state.message;
        this.abrirModal();
      }
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  abrirModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      // Crear directamente una instancia de Modal
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
      
      // Configurar el cierre del modal para que actualice el servicio
      modal.addEventListener('hidden.bs.modal', () => {
        this._serviceModalDocente.hidePopup()
      }, { once: true });
    }
  }
}
