import { Location } from "@angular/common";
import { Router } from "@angular/router";

export class StateManager{
    constructor(private location:Location,private route:Router){
        try{
            console.log(this.location);
        }catch(error){
            console.error(error);
        }
    }

    public goBack(){
        try{
            this.location.back();
        }catch(error){
            console.error(error);
        }
    }

    public goForward(){
        try{
            this.location.forward();
        }catch(error){
            console.error(error);
        }
    }

    public go(url:string){
        try{
            this.location.go(url);
        }catch(error){

        }
    }

    public refresh(){

    }

    /**
     * @author SSW
     * @description this function is used for routing to particular Url
     */
    public goto(url:string,data?:any){
        try{
            this.route.navigate([url,data]).then((res)=>{
                console.log("Navigation Successfull");
            },(error)=>{
                console.error(error);
            });
        }catch(error){
            console.error(error);
        }
    }
}