import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}  
    
  
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      AOS.init();
    }
    
  }
  

}
