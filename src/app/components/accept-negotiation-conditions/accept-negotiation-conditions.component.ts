import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-accept-negotiation-conditions',
  standalone: true,
  imports: [
    FormsModule,
    CdkTextareaAutosize,
  ],
  templateUrl: './accept-negotiation-conditions.component.html',
  styleUrl: './accept-negotiation-conditions.component.scss'
})
export class AcceptNegotiationConditionsComponent {

  @Output() onAccept = new EventEmitter<boolean>();
  @Output() onDecline = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<boolean>();

  openDecline: boolean = false;
  reason: string = '';


  accept() {
    this.onAccept.emit();
  }

  decline() {
    this.onDecline.emit(this.openDecline ? this.reason : '');
  }

  confirmDecline() {
    this.openDecline = true;
  }
  closeDecline() {
    this.openDecline = false;
  }

  close() {
    this.onClose.emit();
  }

}
