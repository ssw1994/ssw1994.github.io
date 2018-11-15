import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img-gallary',
  templateUrl: './img-gallary.component.html',
  styleUrls: ['./img-gallary.component.css']
})
export class ImgGallaryComponent implements OnInit {

  @Input()
    imageList:Array<any>;

  @Input()
    showCount:number;


  filePath:string;
  start:number = 0;
  constructor() {
    try{
    this.filePath = "./assets/products/Mech/images/";
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

  setImage(img:string){
    try{
      this.currentImage = img;
    }catch(error){
      console.error(error);
    }
  }

  getStyle(img:string):any{
    return {
      "width": 100 / (this.showCount + 2) + "%",
      "background-image":"url('"+ this.filePath + img + "')"
    }
  }

  currentImage:string;
  ngOnChanges(){
    try{
      if(this.imageList && this.imageList.length > 0){
        this.currentImage = this.imageList[0];
      }
    }catch(error){
      console.error(error);
    }
  }

  slide(iSlide:number){
    try{
      if(((this.start + this.showCount) < this.imageList.length - 1 && iSlide == 1) || (this.start > 0 && iSlide == -1))
        this.start += iSlide;
    }catch(error){
      console.error(error);
    }
  }
}
