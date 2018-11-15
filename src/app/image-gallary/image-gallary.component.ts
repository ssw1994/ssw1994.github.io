import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-image-gallary',
  templateUrl: './image-gallary.component.html',
  styleUrls: ['./image-gallary.component.css']
})
export class ImageGallaryComponent implements OnInit {

  filePath:string;
  imageSelected:string;
  images:Array<any> = [{url:"watch1.jpeg",name:"watch"},{url:"watch2.jpeg",name:"watch"},{url:"watch3.jpeg",name:"watch"},{url:"watch4.jpeg",name:"watch"}]
  constructor() { 
    this.filePath = "./assets/data/";
    this.imageSelected = this.images[0].url;
  }

  ngOnInit() {
  }
  setImage(image:any){
    this.imageSelected = image.url;
  }
  ngAfterViewInit(){
    $(".image-thumbnail").css("border","0px");
    $(".mat-card.mat-card").css("border","0px");
  }

}
