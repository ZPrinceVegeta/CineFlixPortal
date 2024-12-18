import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import{ MatTooltipModule} from '@angular/material/tooltip'

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
  constructor(private router : Router , private activatedRoute : ActivatedRoute){
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
  ngOnInit(): void {
    const currentUrl = sessionStorage.getItem('landingUrl') || null
    this.currentUrl = currentUrl != null ? currentUrl : '/'
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event :any)=>{
      if(event instanceof NavigationStart ){
        this.currentUrl = event.url
        sessionStorage.setItem('landingUrl' , event.url)
      }
    })

  }
  navigateSignin(){
    this.router.navigate(['/signin'])
  }
  check(){
  }
}
