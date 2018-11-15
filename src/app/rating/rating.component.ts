import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()
    enableRating:boolean;

  @Input()
    rating:number;


  stars:Array<any> = [{label:'star',value:1},{label:'star',value:2},{label:'star',value:3},
  {label:'star',value:4},{label:'star',value:5}]

  ratingCopy:number;
  constructor() { 
    
  }

  ngOnChanges(){
    this.ratingCopy = this.rating;
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    
  }

  starFocused(iVal?:number){
    //console.log("Called in");
    this.rating = <number>iVal;
  }

  starClicked(iVal:number){
    if(iVal){
      this.rating = <number>iVal;
      this.ratingCopy = this.rating;
    }
  }

  starFocusedOut(iVal?:number){
    //console.log("Called Out");
    this.rating = this.ratingCopy;
  }

}
