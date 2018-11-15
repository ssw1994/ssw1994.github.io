import {CanActivate,Router} from "@angular/router";
import { Injectable } from "@angular/core";
import { ProductsService } from "../../services/products.service";
@Injectable()
export class DetailsGuards implements CanActivate {

    constructor(private _prdService:ProductsService,private route:Router){

    }

    canActivate() {
      try{
        if(this._prdService.currentProduct){
            return true;
        }else{
            this.route.navigate(["mech"]).then(()=>{
                console.log("Routing Listing Succesful");
            },(error)=>{
                console.error(error);
            });
        }
      }catch(error){
          console.error(error);
      }
      return true;
    }
  }