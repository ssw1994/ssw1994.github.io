import { Component, OnInit } from '@angular/core';
import { RulesService } from '../services/rules/rules.service';
import { localDB } from "../general/lsdb";
@Component({
  selector: 'app-ruleattribute',
  templateUrl: './ruleattribute.component.html',
  styleUrls: ['./ruleattribute.component.css']
})
export class RuleattributeComponent implements OnInit {

  attributes:any = {
    userAttributes:[],
    logicalAttributes:[],
  }
  
  constructor(private ruleService:RulesService) { }

  ngOnInit() {
    try{
      this.loadDropDowns();
    }catch(error){
      console.error(error);
    }
  }

  loadDropDowns(){
    try{
      this.ruleService.getRuleAttribute().subscribe(
        (res)=>{
          if(res){
            if(res.logicdriven){
              this.attributes.logicalAttributes = res.logicdriven;
            }
            if(res.userdefined){
              this.attributes.userAttributes = res.userdefined;
            }

            if(localDB.getDatabyKey("attributes")){
              this.attributes = localDB.getDatabyKey("attributes");
            }
          }
        },
        (error)=>{
          console.error(error);
        }
      );
    }catch(error){
      console.error(error);
    }
  }

  ngOnDestroy(){
    try{
      localDB.setDatabyKey("attributes",this.attributes);
    }catch(error){
      console.error(error);
    }
  }
}
