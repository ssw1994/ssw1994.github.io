import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

   a:number;
   b:number;
   c:number;
   ans:number;
   equation:any;

  constructor() { }

  ngOnInit() {
    this.solveEquation(1,1,-12);
  }

  /**
   * @author SSW
   * @description this function is used for finding factor of the equation
   */
  solveEquation(a:number,b:number,c:number){
    try{
      let ans = ((-1 * a) + Math.sqrt((b * b) - (4 * a * c)))/ (2 * a);
      let ans1 = ((-1 * a) - Math.sqrt((b * b) - (4 * a * c)))/ (2 * a);
      console.log(ans,ans1);
    }catch(error){
      console.error(error);
    }
  }

}
