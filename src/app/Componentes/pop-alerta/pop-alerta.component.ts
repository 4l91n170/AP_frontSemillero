import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupType, ServiceModalDocenteService } from '../../Servicios/service-modal-docente.service';
import { Subscription } from 'rxjs';

declare var bootstrap: any;
@Component({
  selector: 'app-pop-alerta',
  standalone: false,
  templateUrl: './pop-alerta.component.html',
  styleUrl: './pop-alerta.component.css'
})
export class PopAlertaComponent {

 textoAlerta = '';
  mostrarModal = false;
  private subscription: Subscription = new Subscription();
  
  constructor(public _serviceModalDocente: ServiceModalDocenteService) {}
  
  ngOnInit() {
    this.subscription = this._serviceModalDocente.popupState$.subscribe(state => {
      if (state.show && state.type === PopupType.ALERTA) {
        this.textoAlerta = state.message;
        this.abrirModal();
      }
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  abrirModal() {
    const modal = document.getElementById('alertModal');
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



