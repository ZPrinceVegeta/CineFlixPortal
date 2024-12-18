import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import{ MatTooltipModule} from '@angular/material/tooltip'
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit , OnDestroy{
  currentUrl : string = ''
  destroy$ : Subject<void> =new  Subject()
  constructor(private router : Router , private activatedRoute : ActivatedRoute , @Inject(PLATFORM_ID) private platformId: Object) {
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      AOS.init();
      const currentUrl = sessionStorage.getItem('landingUrl')
      this.currentUrl = currentUrl != null ? currentUrl : '/'
      this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event :any)=>{
      if(event instanceof NavigationStart ){
        this.currentUrl = event.url
        sessionStorage.setItem('landingUrl' , event.url)
      }
    })
    }
    
    
  }
  navigateSignin(){
    this.router.navigate(['/signin'])
  }
  check(){
  }
}
