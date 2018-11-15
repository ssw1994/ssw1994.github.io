import { Component, OnInit, Inject, Input, ViewChild, ElementRef, ComponentRef, ViewContainerRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { GmapService } from "../gmap.service";
@Component({
  selector: 'app-multiple-maps',
  templateUrl: './multiple-maps.component.html',
  styleUrls: ['./multiple-maps.component.css']
})
export class MultipleMapsComponent implements OnInit {
//@ViewChild("map") mapElement;
//@ViewChild("pleaseConnect") pleaseconnect;
  constructor(private gmap:GmapService,private _elem: ElementRef) {
    try{
      this.loadMap();
      //this.loadMap(this._elem.nativeElement.querySelector('#map'),this._elem.nativeElement.querySelector('#pleaseConnect'));
      //this.loadMap(this._elem.nativeElement.querySelector('#map1'), this._elem.nativeElement.querySelector('#pleaseConnect1'));
    }catch(error){
      console.error(error);
    }
  }

  loadMap(){
    setTimeout(() => {
      //if(mapEle && pleaseEle){
        let mapLoaded: any = this.gmap.initMap(this._elem.nativeElement.querySelector('#map'),this._elem.nativeElement.querySelector('#pleaseConnect'));
        Promise.all([
          mapLoaded,
      ]).then((result) => {    
          let locations = result[1];
      });

      let mapLoaded2: any = this.gmap.initMap(this._elem.nativeElement.querySelector('#map1'),this._elem.nativeElement.querySelector('#pleaseConnect1'));
      Promise.all([
        mapLoaded2,
    ]).then((result) => {    
        let locations = result[1];
    });
      //}
    });
  }

  ngOnInit() {
  }

}
