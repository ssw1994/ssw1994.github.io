import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../services/products.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
@Component({
  selector: 'app-mech',
  templateUrl: './mech.component.html',
  styleUrls: ['./mech.component.css']
})
export class MechComponent implements OnInit {
  products:Array<any> = [];
  filePath:string;
  recordsPerPage:number = 3;
  currentPage:number = 0;
  start:number = 0;
  constructor(private product:ProductsService,private route:Router) { 
    this.filePath = "./assets/products/Mech/images/";
  }

  ngOnInit() {
    try{
      this.getProducts();
    }catch(error){
      console.error(error);
    }
  }

  getProducts(){
    try{
      let param:any = {
        type:"MECH"
      }
      this.product.getProducts(param).subscribe((result)=>{
        if(result){
          console.log(result);
          this.products = result;
        }
      });
    }catch{
      console.error("Something Went wrong")
    }
  }

  getProductDetails(iProduct:any){
    try{
      this.product.currentProduct = iProduct;
      this.route.navigateByUrl("/product-details/" + iProduct.productName).then((res)=>{
        console.log(res);
      },(error)=>{
        console.error(error);
      });
    }catch(error){
      console.error(error);
    }
  }

  getCurrentPage(iPage:number){
    try{
      this.currentPage = iPage;
    }catch(error){
      console.error(error);
    }
  }
}
