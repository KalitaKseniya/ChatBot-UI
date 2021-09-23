import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  public text: string 
  public type: string = 'success'
  @Input() delay = 5000
  aSub: Subscription

  constructor(private alert: AlertService) { }

  ngOnInit(): void {
    this.aSub = this.alert.alert$.subscribe(alert =>{
      this.text = alert.text
      this.type = alert.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}
