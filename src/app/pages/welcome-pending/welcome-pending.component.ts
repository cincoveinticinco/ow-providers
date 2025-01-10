import { Component } from '@angular/core';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';

@Component({
  selector: 'app-welcome-pending',
  standalone: true,
  imports: [LateralMenuComponent],
  templateUrl: './welcome-pending.component.html',
  styleUrl: './welcome-pending.component.scss'
})
export class WelcomePendingComponent {
}
