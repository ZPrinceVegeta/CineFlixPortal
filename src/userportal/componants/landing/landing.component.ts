import { ActivatedRoute, ParamMap, Router, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet , FooterComponent , HeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {


}
