import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import{ MatTooltipModule} from '@angular/material/tooltip'
import { FrequentQuestionsComponent } from '../frequent-questions/frequent-questions.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatTooltipModule,FrequentQuestionsComponent ,CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent  implements OnInit , OnDestroy{
  detroy$ : Subject<void> =  new Subject()
  urlArray = ['landingbg3' , 'landingbg5' , 'landingbg6' , 'landingbg7']
  backgroundUrl : string = ''
  interval: any;
  constructor(private router : Router , @Inject(PLATFORM_ID) private platformId: any){}
  ngOnDestroy(): void {
    if(isPlatformBrowser(this.platformId) ){
      clearInterval(this.interval)
    }
   
   
  }
  ngOnInit(): void {

    if(isPlatformBrowser(this.platformId)){
    AOS.init();

    }
  }

  navigateSignUp(){
    this.router.navigate(['/signup'])
  }
}
