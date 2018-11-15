import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
declare var jQuery:any;
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
    product:any;

  @Output()
    clicked = new EventEmitter<any>();

  filePath:string;
  constructor() { 
    try{
      this.filePath = "./assets/products/Mech/images/";
    }catch(error){
      console.error(error);
    }
  }

  ngOnInit() {
  }

  numberFormat(iNumber:any,iPrecision:number):any{
    try{
      return parseFloat(iNumber).toFixed(iPrecision);
    }catch(error){
      console.error(error);
      return null;
    }
  }

  showDetails(){
    try{
      if(this.clicked){
        this.clicked.emit(this.product);
      }
    }catch(error){
      console.error(error);
    }
  }

  ngAfterViewInit(){
    try{
      jQuery(document).ready(function() {
        jQuery('.image-container').jqzoom({
                  zoomType: 'standard',
                  lens:true,
                  preloadImages: false,
                  alwaysOn:true
              });
      });
    }catch(error){
      console.error(error);
    }
  }
}
