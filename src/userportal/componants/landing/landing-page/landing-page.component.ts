import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ MatTooltipModule} from '@angular/material/tooltip'
import { FrequentQuestionsComponent } from '../frequent-questions/frequent-questions.component';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

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
  constructor(private router : Router){}
  ngOnDestroy(): void {
   clearInterval(this.interval)
   console.log('interval cleared');
   
  }
  ngOnInit(): void {
     
  }

  navigateSignUp(){
    this.router.navigate(['/signup'])
  }
}
