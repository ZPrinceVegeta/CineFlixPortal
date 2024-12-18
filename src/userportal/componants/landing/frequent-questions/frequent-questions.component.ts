import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-frequent-questions',
  standalone: true,
  imports: [],
  templateUrl: './frequent-questions.component.html',
  styleUrl: './frequent-questions.component.scss'
})
export class FrequentQuestionsComponent {
  viewportWidth !: number;
  openedListIndex !: number

  
  listArray : Array<boolean> = new Array(6).fill(false);
  listStyleArray = [{headMargin : 60 , factor : 14.5} , 
    {headMargin : 50 ,factor : 47} , 
    {headMargin : 80 ,factor : 12} , 
    {headMargin : 55 ,factor : 48} , 
    {headMargin : 55 ,factor : 50} , 
    {headMargin : 80 ,factor : 25} , 
  ]
  @ViewChildren('list') list!: QueryList<ElementRef>
  constructor(){
    this.viewportWidth = window.innerWidth
    fromEvent(window, 'resize').subscribe(()=>{
      this.viewportWidth = window.innerWidth
    })
  }

  openList(index : number){
    this.openedListIndex = index    
    this.listArray.forEach((item : boolean, indexNo : number)=>{
      if(index == indexNo)
        this.listArray[index] = !this.listArray[index]
      else
        this.listArray[indexNo] = false
    })
    if(this.list){
      this.list.forEach((item :ElementRef , indexNo : number)=>{
        if(indexNo == index){
          if(this.listArray[index]){
            let margin = this.viewportWidth > 900 ? this.listStyleArray[index].headMargin : this.listStyleArray[index].headMargin + (1600 - this.viewportWidth)/this.listStyleArray[index].factor
            item.nativeElement.children[0].style.marginBottom = margin.toString() + 'px'
            item.nativeElement.children[0].children[1].style.transform = 'rotate(45deg)'
          }
            
          else{
            item.nativeElement.children[0].style.marginBottom = '0px'
            item.nativeElement.children[0].children[1].style.transform = 'rotate(90deg)'
          }
        }
        else{
          item.nativeElement.children[0].style.marginBottom = '0px'
          item.nativeElement.children[0].children[1].style.transform = 'rotate(90deg)'
        }
      })
    }
  }

}
