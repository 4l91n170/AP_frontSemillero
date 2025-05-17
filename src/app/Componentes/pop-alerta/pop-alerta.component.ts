import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupService, PopupType } from '../../Servicios/service-popup.service';
import { Subscription } from 'rxjs';

// Asegurarnos de que bootstrap está disponible globalmente
declare var bootstrap: any;

@Component({
  selector: 'app-pop-alerta',
  standalone: false,
  templateUrl: './pop-alerta.component.html',
  styleUrl: './pop-alerta.component.css'
})
export class PopAlertaComponent implements OnInit, OnDestroy {
  textoAlerta = '';
  mostrarModal = false;
  private subscription: Subscription = new Subscription();
  
  constructor(public popupService: PopupService) {}
  
  ngOnInit() {
    this.subscription = this.popupService.popupState$.subscribe(state => {
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
        this.popupService.hidePopup();
      }, { once: true });
    }
  }
}