import { Component, Input } from '@angular/core';
import { TIPOPERSONA } from '../../../shared/Interfaces/typo_persona';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-previous-answers-vendor',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './previous-answers-vendor.component.html',
})
export class PreviousAnswersVendorComponent {

  @Input() crew: any = null;

  readonly TIPOPERSONA = TIPOPERSONA;

}
