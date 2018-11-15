import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qty-counter',
  templateUrl: './qty-counter.component.html',
  styleUrls: ['./qty-counter.component.css']
})
export class QtyCounterComponent implements OnInit {

  @Input()
  quantity:number;
  
  @Output()
  getQauntity = new EventEmitter<number>();

  constructor() { 

  }

  inc(){
    try{
      this.quantity +=1;
    }catch(error){
      console.error(error);
    }
  }

  dec(){
    try{
      this.quantity -= 1;
    }catch(error){
      console.error(error);
    }
  }

  ngOnInit() {
  }

}
