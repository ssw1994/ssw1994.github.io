import { Component, OnInit ,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder,FormArray} from "@angular/forms";
import { PostmanService } from "../services/postman/postman.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { JsonPipe } from "@angular/common";
import { componentFactoryName } from '@angular/compiler';

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"/
const jsonRegex = /^\{.*\:\{.*\:.*\}\}/
export interface IApi{
  request:any;
  response:any;
  url:string;
  headers:any;
  body:any;
  method:any;
}

export class API implements IApi{

    request:any;
    response:any;
    url:string;
    headers:any;
    body:any;
    method:any;
    constructor(){

    }

    get _request():any{
        return this.request
    }

    set _request(request:any){
      this.request = request;
    }

    get _response():any{
      return this.response
    }

    set _response(response:any){
      this.response = response;
    }
  
    get _url():string{
      return this.url;
    }

    set _url(url:string){
      this.url = url;
    }

    get _body():any{
      return this._body;
    }

    set _body(body:any){
      this.body = body;
    }

    get _headers():any{
      return this.headers
    }

    set _headers(headers:any){
      this.headers = headers;
    }

    get _method():any{
      return this.method;
    }

    set _method(method:any){
      this.method = method;
    }
}

@Component({
  selector:"file-save",
  templateUrl:"./file-save.component.html",
  styleUrls:['./api-tester.component.css'],
})
export class fileSave implements OnInit{

  fileForm:FormGroup;
  fileName:string;
  constructor(public dialogRef: MatDialogRef<fileSave>,public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder){
    try{
      this.fileForm = <FormGroup>this.fb.group({
        fileName:['',[Validators.required]]
      });
    }catch(error){
      console.error(error);
    }
  }

  ngOnInit(){
    try{

    }catch(error){
      console.error(error);
    }
  }

  saveFile(){
    try{
      if(this.fileForm.valid)
        this.dialogRef.close({fileName:this.fileName});
    }catch(error){
      console.error(error);
    }
  }

  cancel(){
    try{
      this.dialogRef.close()
    }catch(error){
      console.error(error);
    }
  }
}

@Component({
  selector: 'app-api-tester',
  templateUrl: './api-tester.component.html',
  styleUrls: ['./api-tester.component.css'],
  providers:[JsonPipe]
})
export class ApiTesterComponent implements OnInit {


  apiForm:FormGroup;
  methods:Array<any> = [
    {DropDownName:"GET", DropDownID:"GET"},
    {DropDownName:"POST", DropDownID:"POST"},
    {DropDownName:"PUT", DropDownID:"PUT"},
    {DropDownName:"DELETE", DropDownID:"DELETE"},
  ];

  contentTypes:Array<any> = [
    {DropDownID:"",DropDownName:"text/html"},
    {DropDownID:"",DropDownName:"multipart/form-data"},
    {DropDownID:"",DropDownName:"application/x-www-form-urlencoded"},
  ]

  requestOptions:Array<any> = [
    { DropDownID:1, DropDownName:"Params" , values:[]},
    { DropDownID:2, DropDownName:"Authorization",values:[]},
    { DropDownID:3, DropDownName:"Headers",values:[]},
    { DropDownID:4, DropDownName:"Body",values:[]},
  ]

  apiDetails:IApi = {} as IApi;
  currentTab:number = 1;
  paramForm:FormGroup;
  headerForm:FormGroup;
  loading:boolean = false;

  constructor(private fb:FormBuilder,private _postman:PostmanService , private _json:JsonPipe,public dialog: MatDialog) {
    this.apiDetails.method = "GET";
    try{
      this.apiForm = <FormGroup>fb.group({
        url:['',[Validators.required]],
        method:['',[Validators.required]],
        body:['',[Validators.pattern(jsonRegex)]],
        params:fb.array([]),
        headers:fb.array([])
      });
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used on loading component
   */
  ngOnInit() {
    try{
      this.apiDetails.headers = this._postman.headers;
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used printing API Response
   */
  printResponse(){
    try{
      let title = this.apiDetails.url;
      let printContents, popupWin;
        printContents = document.getElementById('response').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
		  <html>
				<head>
					<title>`+ title + `</title>
          <style>
          .string { color: green; }
          .number { color: darkorange; }
          .boolean { color: blue; }
          .null { color: magenta; }
          .key { color: red; }
					</style>
				</head>

				<body onload="window.print();window.close()">${printContents}</body>
		  </html>`
        );
        popupWin.document.close();
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for doing actual action
   */
  doAction(iArr:Array<any>,iAction:number,iIndex?:number){
    try{
      if(iAction == 1){
        iArr.push({})
      }else if(iAction == -1 && iIndex >= 0){
        iArr.splice(iIndex,1);
      }
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for adding value
   */
  addValue(choice:string,action:number,iIndex?:number){
    try{
      switch(choice){
          case "Params":this.addGroup(this.apiForm,action,"params",iIndex);break;
          case "Authorization":break;
          case "Headers":this.addGroup(this.apiForm,action,"headers",iIndex);break;
          case "Body":this.doAction(this.requestOptions[3].values,action,iIndex);break;
          default:
              console.error("default error");
      }
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for updating API Url as per request params
   */
  updateUrl(){
    try{
      let apiUrl = this.apiDetails.url;
      if(apiUrl.indexOf('?') > -1){
        apiUrl = apiUrl.split('?')[0];
      }
      let url  = "";
      let formArray:FormArray = this.apiForm.get("params") as FormArray;
      for( let group of formArray.controls){
        let key = group.get('key').value;
        let value = group.get('value').value;
        url += url ? ("&" + (key + (value ? ("=" + value) : ""))) : (key + (value ? ("=" + value) : ""));
      }
      this.apiDetails.url = apiUrl + (url ? ("?" + url) : "");
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for adding form group to form
   */
  addGroup(iForm:FormGroup,iAction:number,iControl:string,iIndex?:any){
    try{
      let formArray:FormArray = iForm.get(iControl) as FormArray;
      if(iAction == 1){
        let form = <FormGroup>this.fb.group({
          key:['',[Validators.required]],
          value:['',[Validators.required]]
        });
        if(iControl === 'params'){
          form.get('key').valueChanges.subscribe(
            ()=>{
              this.updateUrl();
            },
            (error)=>{
              console.error(error);
            }
          );
  
          form.get('value').valueChanges.subscribe(
            ()=>{
              this.updateUrl();
            },
            (error)=>{
              console.error(error);
            }
          );
          this.updateUrl();
        }
        formArray.push(form);
      }else if(iAction == -1 && iIndex >= 0){
        formArray.removeAt(iIndex);
      }
      formArray.updateValueAndValidity({onlySelf:true,emitEvent:false});
    }catch(error){
      console.error(error);
    }
  }

  copyContent(){
    try{
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    }catch(error){
      console.error(error);
    }
  }

  saveToFile(content:any, contentType:string){
    try{
      const dialogRef = this.dialog.open(fileSave, {
        width: '350px',
        data: {}
      });

      dialogRef.afterClosed().subscribe(
        (res)=>{
          if(res.fileName){
            let fileName = res.fileName + ".doc"; //+ contentType.substring(contentType.lastIndexOf('/')+1);
            var a = document.createElement("a");
            var file = new Blob([JSON.stringify(content,null,2)], {type: contentType});
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
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

  beutifyJson(){
    try{
      this.apiDetails.body = JSON.stringify(this._json.transform(this.apiDetails.body),null,2);
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @param choice
   * @description this function is used for calling respective api
   */
  callApi(choice:string){
    try{
      switch(choice){
        case "GET":
              this.getApi();
              break;
        case "POST":
              this.postApi();
              break;
        case "PUT":
              this.putApi();
              break;
        case "DELETE":
              this.deleteApi();
              break;
        default:
          console.error("In default case");
      }
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for calling get api
   */
  getApi(){
    try{
      this.loading = true;
      this._postman.get(this.apiDetails.url).subscribe(
        (res)=>{
          console.log(res);
          if(res){
            this.loading = false;
            this.apiDetails.response = res;
            this.output(this.syntaxHighlight(this._json.transform(res)));
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

  /**
   * @author SSW
   * @description this function is used for calling put api
   */
  putApi(){
    try{
      this.loading = true;
      this._postman.put(this.apiDetails.url,this.apiDetails.body).subscribe(
        (res)=>{
          console.log(res);
          if(res){
            this.loading = false;
            this.apiDetails.response = res;
            this.output(this.syntaxHighlight(this._json.transform(res)));
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

  /**
   * @author SSW
   * @description this function is used for calling post api
   */
  postApi(){
    try{
      this.loading = true;
      this._postman.post(this.apiDetails.url,this.apiDetails.body).subscribe(
        (res)=>{
          console.log(res);
          if(res){
            this.loading = false;
            this.apiDetails.response = res;
            this.output(this.syntaxHighlight(this._json.transform(res)));
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

  /**
   * @author SSW
   * @description this function is used for calling delete api
   */
  deleteApi(){
    try{
      this.loading = true;
      this._postman.delete(this.apiDetails.url).subscribe(
        (res)=>{
          console.log(res);
          if(res){
            this.loading = false;
            this.apiDetails.response = res;
            this.output(this.syntaxHighlight(this._json.transform(res)));
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

  output(inp) {
    document.getElementById("res-body").innerHTML = inp;
  }

  syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  }

}
