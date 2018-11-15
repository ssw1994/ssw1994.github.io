import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {map,startWith} from "rxjs/operators";
@Component({
  selector: 'app-custom-drop',
  templateUrl: './custom-drop.component.html',
  styleUrls: ['./custom-drop.component.css']
})
export class CustomDropComponent implements OnInit {

  @Input()
    list:Array<any>;
  
  @Input()
    required:boolean;
  
  @Output()
    selected = new EventEmitter();;
  
  @Input()
    id:any;

  @Input()
  placeholder:string;
  
  listForm:FormGroup;
  filteredList:Observable<any>;
  label:string;

  constructor(private fb:FormBuilder) {
    try{
      this.listForm = this.getListForm();
    }catch(error){
      console.error(error);
    }
   }

   /**
    * @author SSW
    * @description this function is used for creating list form
    * @param iObj 
    */
  getListForm(iObj?:any):FormGroup{
    try{
      let formGroup:FormGroup;
      if(iObj && Object.keys(iObj).length > 0){
        formGroup = <FormGroup>this.fb.group({
          choice:['']
        });
      }else{
        formGroup = <FormGroup>this.fb.group({
          choice:['']
        });
      }
      return formGroup;
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for clearing filter
   */
  clearFilter(){
    try{

    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used on selection of option
   * @param item 
   */
  optionSelected(item:any){
    try{
      this.id = item.value;
      if(this.selected)
        this.selected.emit(this.id);
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for setting default filters
   */
  setDefaultFilter(){
    try{

    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used filter array according to ivalue
   * @param iArr
   * @param iValue
   */    
  filter(iArr: Array<any>, iValue: any):Array<any> {
    return iArr.filter((value) => {
       return value.label.toLowerCase().indexOf(iValue.toLowerCase()) > -1;
    });
  }

  mapValueToLabel(id:any){
    try{
      if(this.list && this.list instanceof Array){
        let index = this.list.findIndex((x)=> x.value == id);
        if(index >= 0){
          this.label = this.list[index].label;
        }else{
          this.label = null;
        }
      }
    }catch(error){
      console.error(error);
    }
  }

  ngOnChanges(){
    try{
      if(this.list && this.list instanceof Array){
        this.filteredList = this.listForm.get('choice').valueChanges
        .pipe(
        startWith(''),
        map(item => item ? this.filter(this.list,item) : this.list.slice())
        );
      }
      if(this.id){
        this.mapValueToLabel(this.id);
      }
      if(this.required){
        this.listForm.get('choice').setValidators([Validators.required]);
        this.listForm.updateValueAndValidity({onlySelf:true,emitEvent:false});
      }
    }catch(error){
      console.error(error);
    }
  }

  ngOnInit() {
    try{
      
    }catch(error){
      console.error(error);
    }
  }

}
