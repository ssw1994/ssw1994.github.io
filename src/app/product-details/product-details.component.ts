import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../services/products.service";
declare var jQuery:any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  tabs:Array<any> = [
    {title:"Specification",id:1},
    {title:"Reviews",id:2},
    {title:"Description",id:3}
  ]
  selectedTab:any = this.tabs[0];
  constructor(private _productService:ProductsService) { 
    
  }

  imgShow:number = 3;
  userPath:string = "./assets/products/Mech/users/"
  product:any;
  ngOnInit() {
    try{
      this.product = this._productService.currentProduct;
    }catch(error){
      console.error(error);
    }
  }

  setQuantity(iQuantity:number){
    try{
      this.product.qauntity = iQuantity;
    }catch(error){
      console.error(error);
    }
  }

  ngAfterViewInit(){
    try{
      jQuery(".prd-info .mat-card.mat-card").css("border","0px !important");
    }catch(error){
      console.error(error);
    }
  }

}
