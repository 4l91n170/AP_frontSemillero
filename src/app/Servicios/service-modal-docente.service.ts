import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export enum PopupType {
  ALERTA = 'alerta',
  EXITO = 'exito',
  ERROR = 'error'
}

export interface PopupConfig {
  show: boolean;
  type: PopupType;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ServiceModalDocenteService {
 private popupState = new BehaviorSubject<PopupConfig>({
    show: false,
    type: PopupType.ALERTA,
    message: ''
  });

  public popupState$ = this.popupState.asObservable();

  constructor() { }

  showPopup(type: PopupType, message: string) {
    this.popupState.next({
      show: true,
      type,
      message
    });
  }

  hidePopup() {
    this.popupState.next({
      ...this.popupState.value,
      show: false
    });
  }

  showAlertPopup(message: string) {
    this.showPopup(PopupType.ALERTA, message);
  }

  showSuccessPopup(message: string) {
    this.showPopup(PopupType.EXITO, message);
  }

  showErrorPopup(message: string) {
    this.showPopup(PopupType.ERROR, message);
  }

  
}
