import { Component, OnInit } from '@angular/core';
import {  RulesService } from "../services/rules/rules.service";
import {localDB} from "../general/lsdb";
@Component({
  selector: 'app-rulefilters',
  templateUrl: './rulefilters.component.html',
  styleUrls: ['./rulefilters.component.css']
})
export class RulefiltersComponent implements OnInit {

  constructor(private ruleService:RulesService) { 

  }
  filters:any = {
    defaultTypes:[],
    userTypes:[],
    assetGroups:[],
    assetTypes: [],
    selectedAssetTypes:[],
    selectedAssetGroups:[],
    selectedAssets:null,
    selectedGroups:null,
  }

  

  ngOnInit() {
    try{
      this.loadDropDowns("default");
      //this.loadDropDowns("user");
      //this.loadDropDowns("assetgroup");
      //this.loadDropDowns("assettype")
    }catch(error){
      console.info(error);
    }
  }

  loadDropDowns(type:string){
    try{
      this.ruleService.getRuleFilters().subscribe(
        (res)=>{
          console.log(res);
          switch(type){
            case "default":
              this.filters.defaultTypes = res.default ? res.default : [];
              //break;
            case "user":
              this.filters.userTypes = res.userdefined ? res.userdefined : [];
              //break;
            case "assetgroup":
              this.filters.assetGroups = res.assetgroups ? res.assetgroups : [];
              //break;
            case "assettype":
              this.filters.assetTypes = res.assettypes ? res.assettypes : [];
              //break;
          }

          if(localDB.getDatabyKey("filters")){
            let filters = localDB.getDatabyKey("filters");
            this.checkBoxChecked(filters.defaultTypes[0],"assetGroup");
            this.checkBoxChecked(filters.defaultTypes[0].subTypes[0],"assetTypes");
            this.filters = filters;
          }
        },
        (error)=>{

        }
      );
    }catch(error){
      console.error(error);
    }
  }

  showAssetType:boolean = false;
  showAssetGroup:boolean = false;

  checkBoxChecked(filter:any,iChoice:string){
    try{
      switch(iChoice){
        case "assetTypes":
          if(filter && (filter.DropDownID == "7" && filter.checked)){
            this.showAssetType = true;
          }else if(filter && (filter.DropDownID == "7" && !filter.checked)){
            this.showAssetType = false;
          }
        break;
        case "assetGroup":
        if(filter && (filter.DropDownID == "1" && filter.checked)){
          this.showAssetGroup = true;
        }else if(filter && (filter.DropDownID == "1" && !filter.checked)){
          this.showAssetGroup = false;
        }
        break;
      }
    }catch(error){

    }
  }

  transferFilters(fromArray:Array<any>,toArray:Array<any>,iArr:Array<any>){
    try{
       for(let i=fromArray.length - 1;i>=0;i--){
         if(fromArray[i].DropDownID && iArr.indexOf(fromArray[i].DropDownID) > -1){
            toArray.push(fromArray[i]);
            fromArray.splice(i,1);
         }
       }
       iArr = [];
    }catch(error){
      console.error(error);
    }
  }

  ngOnDestroy(){
    try{
      console.log(JSON.stringify(this.filters));
      localDB.setDatabyKey("filters",this.filters);
    }catch(error){
      console.error(error);
    }
  }
}
