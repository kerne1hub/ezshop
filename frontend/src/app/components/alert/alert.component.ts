import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from "../../services/alert.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy{

  private subscription: Subscription;
  message: { type: string, text: string, cssClass: string };

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            break;
        }

        this.message = message;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
