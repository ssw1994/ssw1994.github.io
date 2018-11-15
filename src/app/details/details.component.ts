import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder} from "@angular/forms";
import {localDB} from "../general/lsdb";
interface details{
  name:string;
  shortName:string;
  refNo:string;
  ruleGroup:any;
  description:any;
  resolutionTip:any;
}


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  detailForm:FormGroup;
  details:details;
  constructor(private fb:FormBuilder) {
    try{
      this.detailForm = this.getDetailForm();
      this.detailForm.updateValueAndValidity({onlySelf:true,emitEvent:false});
    }catch(error){
      console.error(error);
    }
   }

   getDetailForm(iObj?:any){
    try{
      let formGroup:FormGroup;
      if(iObj && Object.keys(iObj).length > 0){
        formGroup = <FormGroup>this.fb.group({
          name:[iObj.name],
          shortName:[iObj.shortName],
          refNo:[iObj.refNo],
          ruleGroup:[iObj.ruleGroup],
          description:[iObj.description],
          resolutionTip:[iObj.resolutionTip]
        });
      }else{
        formGroup = <FormGroup>this.fb.group({
          name:[''],
          shortName:[''],
          refNo:[''],
          ruleGroup:[''],
          description:[''],
          resolutionTip:['']
        });
      }
      return formGroup;
    }catch(error){
      console.error(error);
    }
   }
  ngOnInit() {
    try{
      this.details = {} as details;
      if(localDB.getDatabyKey("details")){
        this.details = localDB.getDatabyKey("details");
      }
    }catch(error){
      console.error(error);
    }
  }

  ngOnDestroy(){
    try{
      localDB.setDatabyKey("details",this.details);
    }catch(error){
      console.error(error);
    }
  }

}
