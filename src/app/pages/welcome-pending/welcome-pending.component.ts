import { Component, Input, OnInit } from '@angular/core';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';
import { TIPOCREW } from '../../shared/Interfaces/typo_crew';

@Component({
  selector: 'app-welcome-pending',
  standalone: true,
  imports: [LateralMenuComponent],
  templateUrl: './welcome-pending.component.html',
  styleUrl: './welcome-pending.component.scss'
})
export class WelcomePendingComponent {

  @Input() crew: any = null;
  @Input() typeCrew: any = null;

  readonly TIPOCREW = TIPOCREW;
}
