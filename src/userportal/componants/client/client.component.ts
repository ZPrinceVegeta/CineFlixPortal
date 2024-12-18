import { Component, Inject } from '@angular/core';
import { MY_TOKEN } from '../../services/injection';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  constructor(@Inject(MY_TOKEN) public token : string ){}

}
