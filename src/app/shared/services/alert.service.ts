import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert{
  type: string
  text: string
}

export type AlertType = 'success' | 'warning' | 'danger'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alert$ = new Subject<Alert>()

  success(text: string){
    this.alert$.next({type: 'success', text})
  }

  danger(text: string){
    this.alert$.next({type: 'danger', text})
  }

  warning(text: string){
    this.alert$.next({type: 'warning', text})
  }
}
