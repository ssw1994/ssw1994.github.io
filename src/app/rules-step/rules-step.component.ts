import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-rules-step',
  templateUrl: './rules-step.component.html',
  styleUrls: ['./rules-step.component.css']
})
export class RulesStepComponent implements OnInit {
  @ViewChild('stepper') stepper;

  isLinear = false;
  constructor(private _formBuilder: FormBuilder) {
  }

  changeStep(index: number) {
    this.stepper.selectedIndex += index;
  }

  ngOnInit() {
    
  }

}
