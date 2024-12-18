import { Component } from '@angular/core';
import { CreateProfileComponent } from './create-profile/create-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CreateProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
