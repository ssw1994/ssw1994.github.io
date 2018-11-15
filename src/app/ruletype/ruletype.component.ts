import { Component, OnInit } from '@angular/core';
import {RulesService} from "../services/rules/rules.service";
import {localDB} from "../general/lsdb";
@Component({
  selector: 'app-ruletype',
  templateUrl: './ruletype.component.html',
  styleUrls: ['./ruletype.component.css']
})
export class RuletypeComponent implements OnInit {

  ruleTypes:Array<any> = [];
  type:any = {
    selectedType:""
  }
  constructor(private ruleService:RulesService) { }

  ngOnInit() {
    try{
      this.getRuleTypes();
      if(localDB.getDatabyKey("type")){
        this.type = localDB.getDatabyKey("type");
      }
    }catch(error){
      console.error(error);
    }
  }

  getRuleTypes(){
    try{
      this.ruleService.getRuleTypes().subscribe(
        (res)=>{
          if(res){
            this.ruleTypes = res;
          }
        },
        (error)=>{

        }
      );
    }catch(error){
      console.error(error);
    }
  }


  ngOnDestroy(){
    try{
      localDB.setDatabyKey("type",this.type);
    }catch(error){
      console.error(error);
    }
  }

}
