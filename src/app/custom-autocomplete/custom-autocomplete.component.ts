import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from "@angular/forms";
import { HttpClient, HttpParams, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {startWith,map,catchError} from "rxjs/operators";

const postCodeRegex = "^([Gg][Ii][Rr] ?0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) ?[0-9][A-Za-z]{2})$";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

declare var jQuery:any;

/************ POST CODE PIPE */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "postCodePipe"
})
export class postCodePipe implements PipeTransform {
    transform(data: Array<any>, postCode: any, latitude?: any, longitude?:any) {
        if (data && data.length > 0) {
            let returnArray = []
            for (let i = 0; i < data.length; i++) {
                let item = data[i].split(',');
                let temp = item.filter((x) => { return x != " " });
                let tempItemAddr = item[0] + "," + item[1] + "," + item[2] + "," + item[3];
                let tempAddr = tempItemAddr.split(',').filter((x)=> x !== " ");
                //let tempAddr = tempItemAddrNew.filter((x) => { return x != " " });
                let str = "";
                let postcode = postCode.indexOf(' ') == -1 ? postCode.toUpperCase().trim().split(/(?=.{3}$)/).join(' ') : postCode.toUpperCase();
                let param: any = {
                    line1: item[0],
                    line2: item[1],
                    line3: item[2],
                    line4: item[3],
                    locality: item[4],
                    city: item[5].split(' ').join(''),
                    fullAddress: temp.join(','),
                    postCode: postcode,
                    state: item[6].split(' ').join(''),
                    address: data[i],
                    onlyAddress: tempAddr.join(','),
                    display: postcode + ", " + item[0] + ", " + item[5] + ", " + item[6],
                    latitude: (latitude || Math.abs(latitude)) ? latitude : null,
                    longitude: (longitude || Math.abs(longitude)) ? longitude : null
                }
                returnArray.push(param);
            }
            return returnArray;
            //return this.removeDuplicates(returnArray, 'display');
        }
        return [];
    }

    removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }
}

/***** COMPONENT */
@Component({
  selector: 'app-custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html',
  styleUrls: ['./custom-autocomplete.component.css'],
  providers:[postCodePipe]
})
export class CustomAutocompleteComponent implements OnInit {

  commonUrl:string = "http://orderwork.iniquus.in/api/common/";
  locations:Array<any> = [];
  filteredLocation: Observable<any[]>;
  postCode:any;
  autoCompleteForm:FormGroup;
  isFocused:boolean = false;
  search:any;
  constructor(private fb:FormBuilder,private http: HttpClient,) { 
    try{
      this.autoCompleteForm = <FormGroup>this.getAutoCompleteForm();
      this.autoCompleteForm.updateValueAndValidity();
    }catch(error){
      console.error(error);
    }
  }

  showLoad:boolean = false;
  /**
   * @author SSW
   * @description this function is used for creating autocomplete form
   * @param iObj 
   */
  getAutoCompleteForm(iObj?:any):FormGroup{
    try{
      let formGroup:FormGroup;
      if(iObj && Object.keys(iObj).length > 0){
        formGroup = <FormGroup>this.fb.group({
          postCode:[iObj.location,[Validators.required,Validators.pattern(postCodeRegex)]]
        });
      }else{
        formGroup = <FormGroup>this.fb.group({
          postCode:['',[Validators.required,Validators.pattern(postCodeRegex)]]
        });
      }
      formGroup.get("postCode").valueChanges.subscribe((res)=>{
          if(formGroup.get("postCode").valid){
            this.showLoad = true;
            this.getLocationByPostCode({postCode:formGroup.get("postCode").value}).subscribe((res)=>{
              console.log(res);
              if (res && res.data) {
                let data = res.data;
                if (data && typeof data == 'string') {
                  this.locations = JSON.parse(data).addresses;
                }
                this.showLoad = false;
              }
            });
          }
      });
      return formGroup;
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
      try{
        return iArr.filter((value) => {
          return value.label.toLowerCase().indexOf(iValue.toLowerCase()) > -1;
      });
      }catch(error){
        console.error(error);
      }
  }

  /**
   * @author SSW
   * @description this function is used for open/close box
   */
  opencloseDropdown(){
    try{
      jQuery(".box").animate({
        height: 'toggle'
      });
    }catch(error){
      console.error(error);
    }
  }

  ngAfterViewInit(){
    try{

    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used on initializing component
   */
  ngOnInit() {
    try{
        this.filteredLocation = this.autoCompleteForm.get('postCode').valueChanges
            .pipe(
            startWith(''),
            map(location => location ? this.filter(this.locations,location) : this.locations.slice())
            );
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for animate dropdowns
   * @param iFlag 
   */
  animateDropDown(iFlag:boolean){
    try{
      setTimeout(()=>{
        this.isFocused = iFlag;
        this.opencloseDropdown();
      },500);
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used showing alert if error in fetching records=
   * @param error 
   */
  public showAlert(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Service Error");
  }

  /**
   * @author SSW 
   * @description this function is used for gettting locations by postCodes
   * */
  getLocationByPostCode(param):Observable<any>{
    try{
      let url = this.commonUrl + "addresses/" + param.postCode.trim().replace(' ','');
        return this.http.get<any>(url, httpOptions)
            .pipe(
            catchError(this.showAlert)
            ); 
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for clering postcode
   */
  clear(){
    try{
      this.autoCompleteForm.get('postCode').setValue(null);
      this.autoCompleteForm.get('postCode').updateValueAndValidity({onlySelf:true,emitEvent:false});
      this.postCode = null;
      this.emptyList();
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for setting location
   */
  setLocation(iLocation:any){
    try{
      console.log(iLocation);
     // setTimeout(() =>{
     //   this.isFocused = false;
      //},500);
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for clearing list
   */
  emptyList(){
    try{
      if(this.postCode)
        this.postCode = this.postCode.toUpperCase();
      
      this.locations = [];
    }catch(error){
      console.error(error);
    }
  }
}
