import { Injectable } from '@angular/core';
import { Observable,Subject,of, observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Global } from '../../shared/global';
import { ActivatedRoute } from '@angular/router';
import { RequestOptions } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private http: HttpClient) { }
  handleError(error:any,options:any):any{
    
  }
  getRuleTypes():Observable<any>{
    try{
      let url = "./assets/rules/ruletypes.json";
      return this.http.get<any>(url, httpOptions)
      .pipe(
      catchError(this.handleError('getRuleTypes', []))
      );
    }catch(error){
      console.error(error);
    }
  }

  getRuleFilters():Observable<any>{
    try{
      let url = "./assets/rules/rulefilters.json";
      return this.http.get<any>(url, httpOptions)
      .pipe(
      catchError(this.handleError('getRuleTypes', []))
      );
    }catch(error){
      console.error(error);
    }
  }

  getRuleCondion():Observable<any>{
    try{
      let url = "./assets/rules/rulecondition.json";
      return this.http.get<any>(url, httpOptions)
      .pipe(
      catchError(this.handleError('getRuleTypes', []))
      );
    }catch(error){
      console.error(error);
    }
  }

  getRuleAttribute():Observable<any>{
    try{
      let url = "./assets/rules/ruleattribute.json";
      return this.http.get<any>(url, httpOptions)
      .pipe(
      catchError(this.handleError('getRuleTypes', []))
      );
    }catch(error){
      console.error(error);
    }
  }
}
