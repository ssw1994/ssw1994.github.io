/// <reference types="@types/googlemaps" />

export interface ILatlng{
  lat:number;
  lng:number;
}


import { Component, OnInit, ViewChild , Input, Output,ElementRef } from '@angular/core';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-map-g',
  templateUrl: './map-g.component.html',
  styleUrls: ['./map-g.component.css'],
  providers:[DatePipe]
})
export class MapGComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  @ViewChild("pacinput") pac_input:ElementRef;

  @Input()
    locations:Array<any>;

  @Input()
    mapStyle:any;

  map: google.maps.Map;

  @Input()
  addMarkerOnClick:boolean;

  @Input()
    defaultSearch:boolean;
  
  constructor(private datePipe:DatePipe) {
  }

  latlng:ILatlng;
  /**
   * @author SSW
   * @description this function is used after component init
   */
  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    google.maps.event.addListener(this.map,"mousemove",(e)=>{
      //console.log(e);
      //console.log(e.latLng.lat(),e.latLng.lng());
      this.latlng = {lat:e.latLng.lat(),lng:e.latLng.lng()};
    });

    google.maps.event.addListener(this.map,"mouseup",(e)=>{
      console.log(e);
      console.log("LAT LNG :",this.latlng);
      console.log(this.map.getCenter().lat(),this.map.getCenter().lng());
    });
  }

  /**
   * @author SSW
   * @description this function is used for enabling google default search
   */
  enableDefaultSearch(){
    try{
      let input = this.pac_input.nativeElement;
      let searchBox = new google.maps.places.SearchBox(input);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      this.map.addListener('bounds_changed', ()=> {
        searchBox.setBounds(this.map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', ()=> {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach((marker)=> {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach((place)=> {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: this.map,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      });
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used on after View init
   */
  ngAfterViewInit(){
    try{
      if(this.defaultSearch)
          this.enableDefaultSearch();
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used on binding data changes
   */
  ngOnChanges(){
    try{
      if(this.addMarkerOnClick){
        setTimeout(()=>{
          google.maps.event.addListener(this.map,"click",(e)=>{
            this.setMarker(e.latLng)
        });
        },1000)
      }

      if(this.locations && this.locations instanceof Array){
        setTimeout(()=>{
          this.locations.forEach((x)=>{
            this.setMarker(x.latlng,x);
          })
        },1000);
      }
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for setting map type
   * @param mapTypeId 
   */
  setMapType(mapTypeId:any){
    try{
      this.map.setMapTypeId(mapTypeId)    
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @param latitude 
   * @param longitude 
   */
  setCenter(latlng:any){
    try{
      this.map.setCenter(new google.maps.LatLng(latlng.lat, latlng.lng));
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for setting marker
   */
  setMarker(latlng:any,iObj?:any){
    try{
      let marker = new google.maps.Marker({
        position: latlng,
        map: this.map,
    });
    this.setInfoWindow(marker,iObj);
    //this.setCenter(latlng);
    }catch(error){
      console.error(error);
    }
  }

  discardClicked(info){
    console.log(info)
  }

  /**
   * @author SSW
   * @description this function is used for creating content format
   * @param info 
   */
  getContent(info:any){
    try{
      let content = "<div>"+ info.woStatus + "<br/>" +
                         info.woTitle + "<br/>" +
                         info.woPostCode + "<br/>" +
                         this.datePipe.transform(info.woDate , "medium") + "<br/>" +
                         info.woTime + "<br/>" +
                         info.woPrice + "&nbsp &nbsp" + info.bidPrice + "<span><i class='fa fa-close' onclick ='discardClicked()'></i>Discard</span>"
                    "</div>";
      return content;
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for setting information window which can be viewed on marker click
   */
  setInfoWindow(marker:any,content?:any){
    try{
      if(content){
        let infowindow = new google.maps.InfoWindow({content: this.getContent(content)});
        marker.addListener("click",()=>{ infowindow.open(this.map,marker)});
        //marker.addListener("mouseover",()=>{ infowindow.open(this.map,marker)});
        //marker.addListener("mouseout",()=>{ infowindow.close()});
      }else{
        let infowindow = new google.maps.InfoWindow({content: this.getContent({title:"James bond",description:"london"})});
        marker.addListener("click",()=>{ infowindow.open(this.map,marker)});
        //marker.addListener("mouseover",()=>{infowindow.open(this.map,marker)});
        //marker.addListener("mouseout",()=>{infowindow.close()});
      }
    }catch(error){
      console.error(error);
    }
  }
}



export enum MapTypeId {
  /**
     This map type displays a transparent layer of major streets on satellite
     images.
   */
  HYBRID,
  /** This map type displays a normal street map. */
  ROADMAP,
  /** This map type displays satellite images. */
  SATELLITE,
  /**
     This map type displays maps with physical features such as terrain and
     vegetation.
   */
  TERRAIN
}
