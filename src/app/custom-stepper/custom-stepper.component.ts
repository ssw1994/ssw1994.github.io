import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.css']
})
export class CustomStepperComponent implements OnInit {

  activeStep:any;
  isLinear:boolean = false;
  steps:Array<any> = [
    {step:1,title:"RULE DETAILS",component:"<app-details></app-details>"},
    {step:2,title:"SELECT RULE TYPE",component:"<app-ruletype></app-ruletype>"},
    {step:3,title:"SELECT FILTERS",component:"<app-rulefilters></app-rulefilters>"},
    {step:4,title:"SET CONDITION",component:"<app-rulecondition></app-rulecondition>"},
    {step:5,title:"SELECT ATTRIBUTES",component:"<app-ruleattribute></app-ruleattribute>"},
    {step:6,title:"TEST RULE",component:"<app-ruletest></app-ruletest>"},
    {step:7,title:"ATTACH SCHEME(S)",component:"<app-ruleattachment></app-ruleattachment>"},
    {step:8,title:"APPROVAL",component:"<app-ruleapproval></app-ruleapproval>"}
  ]
  constructor() { 
    try{
      if(this.steps && this.steps instanceof Array && this.steps.length > 0){
        this.activeStep = this.steps[0];
      }
    }catch(error){
      console.error(error);
    }
  }

  getWidth(){
    return (100 / this.steps.length) + "%";
  }

  changeStep(inc:number){
    try{
      this.activeStep = this.steps[(this.activeStep.step + inc)-1];
      jQuery( ".stepBlock" ).toggle( "slide");
    }catch(error){
      console.error(error);
    }
  }

  stepClick(step:any){
    try{
      if(step)
        this.activeStep = step;
    }catch(error){
      console.error(error);
    }
  }
  ngOnInit() {
  }

  ngAfterViewInit(){
    try{
      jQuery("body").css("background-color","#dfdfdf")
    }catch(error){
      console.error(error);
    }
  }

}
