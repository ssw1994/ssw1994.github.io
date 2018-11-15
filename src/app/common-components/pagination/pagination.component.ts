import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input()
    totalRecords:number;
  
  @Input()
    recordsPerPage:number;
  
  @Input()
    currentPage:number;

  @Input()
    paginationType:string;

  @Output()
     pageDetails = new EventEmitter<any>();

  @Output()
    pageClick = new EventEmitter<any>();

  pages:Array<any> = [];
  
  constructor() { 
    try{

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

  counter = Array;
  ngOnChanges(){
    try{
      this.pages = this.counter(this.getPages());
      if(this.pageDetails){
        this.pageDetails.emit({
          currentPage : this.currentPage,
          
        });
      }
    }catch(error){
      console.error(error);
    }
  }

  getPages():number{
    try{
      return Math.ceil(this.totalRecords/this.recordsPerPage);
    }catch(error){
      console.error(error);
      return null;
    }
  }

  setPage(iPage:number){
    try{
      if(this.pageClick)
        this.pageClick.emit(iPage);
    }catch(error){
      console.error(error);
    }
  }

}
