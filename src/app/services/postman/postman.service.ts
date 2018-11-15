import { Injectable } from '@angular/core';
import { Observable,Subject,of, observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}
@Injectable({
  providedIn: 'root'
})
export class PostmanService {

  headers = httpOptions;
  constructor(private http: HttpClient) { 

  }

  handleError(error:any,options:any):any{
    try{
      throwError(new Error(error.Message || "Something Went Wrong..!"));
    }catch(error){
      console.error(error);
    }
  }

  get(url):Observable<any>{
    try{
      return this.http.get<any>(url, httpOptions)
      .pipe(
      catchError(this.handleError('get', []))
      );
    }catch(error){
      console.error(error);
    }
  }

  post(url:string,body:any):Observable<any>{
    try{
      return this.http.post<any>(url, body,httpOptions)
      .pipe(
      catchError(this.handleError('post', []))
      );
    }catch(error){
      console.error(error);
    }
  }

  put(url:string,body:any):Observable<any>{
    try{
      return this.http.put<any>(url, body,httpOptions)
      .pipe(
      catchError(this.handleError('put', []))
      );
    }catch(error){
      console.error(error);
    }
  }
  
  delete(url:string,body?:any):Observable<any>{
    try{
      return this.http.delete<any>(url,httpOptions)
      .pipe(
      catchError(this.handleError('delete', []))
      );
    }catch(error){
      console.error(error);
    }
  }
}
