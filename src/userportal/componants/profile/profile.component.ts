import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CreateProfileComponent } from './create-profile/create-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CreateProfileComponent , RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
