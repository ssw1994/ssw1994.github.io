import { Component, OnInit } from '@angular/core';
import { RulesService } from '../services/rules/rules.service';
import { localDB } from "../general/lsdb";
@Component({
  selector: 'app-rulecondition',
  templateUrl: './rulecondition.component.html',
  styleUrls: ['./rulecondition.component.css']
})
export class RuleconditionComponent implements OnInit {

  numerator:Array<any> = [];
  validator:Array<any> = [];
  aggregator:Array<any> = [];
  denominator:Array<any> = [];
  conditions:Array<any> = [];
  thens:Array<any> = [];

  rCondition:any = {
    numerator:"",
    validator:"",
    aggregator:"",
    denominator:"",
    conditionsArr:[
      {sr_no:"ls",cType:"",cValue:"",cThen:""},
      {sr_no:"ls",cType:"",cValue:"",cThen:""},
      {sr_no:"ls",cType:"",cValue:"",cThen:""}
    ]
  }
  constructor(private ruleService:RulesService) { }

  ngOnInit() {
    try{
      this.loadDropDowns();
      if(localDB.getDatabyKey("conditions")){
        this.rCondition = localDB.getDatabyKey("conditions");
      }
    }catch(error){
      console.error(error);
    }
  }

  loadDropDowns(){
    try{
      this.ruleService.getRuleCondion().subscribe(
        (res)=>{
          if(res){
            if(res.aggregator){
              this.aggregator = res.aggregator;
            }
            if(res.conditions){
              this.conditions = res.conditions;
            }
            if(res.denominator){
              this.denominator = res.denominator;
            }
            if(res.numerator){
              this.numerator = res.numerator;
            }
            if(res.thens){
              this.thens = res.thens;
            }
            if(res.validator){
              this.validator = res.validator;
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
      localDB.setDatabyKey("conditions",this.rCondition);
    }catch(error){
      console.error(error);
    }
  }

}
