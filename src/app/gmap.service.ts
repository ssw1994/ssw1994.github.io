import { Injectable } from '@angular/core';
declare var google;
declare var jQuery: any;
@Injectable({
  providedIn: 'root'
})
export class GmapService {

  public allMaps:any = {};
  public allElements:any = {};
  public allIds:any = {};
  public apiLoaded:boolean = false;
  public allPleaseConnects:any = {};
  constructor() { 
    window["mapInit"] = () =>{
      console.log("Yes");
    };
  }

  /**
   * @author SSW
   * @description this function is used for loading google javascript map API
   */
  loadMapApi(){
    try{
      return new Promise((resolve)=>{
        if(!this.apiLoaded){
          let script = document.createElement("script");
          script.id = "googleMaps";
          script.src = 'https://maps.google.com/maps/api/js?key=AIzaSyBI1Vi-V3EE4GPBOKDJFiTdgvDrLcd6jaA&callback=mapInit';
          document.body.appendChild(script); 
        }
      });
    }catch(error){
      console.error(error);
    }
  }

  checkForExistingMaps(mapElement:any,pleaseConnect:any,mapId?:string,iCallBack?:any){
    try{
      if(mapElement && pleaseConnect){
          if(mapId){
            this.allIds[mapId] = mapId;
            this.allElements[mapId] = mapElement;
          }else{
            if(mapElement.id){
              this.allIds[mapId] = mapId;
              this.allElements[mapId] = mapElement;
            }
          }
      }
      if(iCallBack && typeof iCallBack == 'function')
        iCallBack();
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for initializing map
   * @param mapElement 
   * @param pleaseConnect 
   * @param mapId 
   */
  initMap(mapElement:any,pleaseConnect:any,mapId?:string){
    try{
      window["mapInit"] = () =>{
        console.info("Script Loaded");
        this.apiLoaded = true;
        //
        this.checkForExistingMaps(mapElement,pleaseConnect,mapId,()=>{
          let latLng = new google.maps.LatLng(55.6351, -4.7815);
          return  new Promise((resolve)=>{
            let mapOptions = {
              center: latLng,
              zoom: 4,
              gestureHandling: 'greedy',
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              streetViewControl: false,
              mapTypeControl: false,//remove map/ satelite options
              fullscreenControl: false,//remove toggle full screen option
              zoomControl: true,
              zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.RIGHT_TOP//change position for zoom controls
              },
            }
            let id:string;
            if(mapElement && pleaseConnect){
              if(mapId){
                this.allIds[mapId] = mapId;
                this.allElements[mapId] = mapElement;
                this.allPleaseConnects[mapId] = pleaseConnect;
                id = mapId;
  
              }else{
                if(mapElement.id){
                  this.allIds[mapId] = mapId;
                  this.allElements[mapId] = mapElement;
                  this.allPleaseConnects[mapId] = pleaseConnect;
                  id = mapElement.id;
                }
              }
              console.log(id);
              this.enableMap(this.allPleaseConnects[mapId]);
              this.allMaps[id] = new google.maps.Map(mapElement, mapOptions)
            }
          });
        });
        //
      }
      this.loadMapApi().then(()=>{
      });
     //if(this.apiLoaded){
      
    // } 
    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for enabling map
   */
  enableMap(pleaseConnect){
    try{
      if(pleaseConnect){
        pleaseConnect.style.display = "none";
      }
    }catch(error){
      console.error(error);
    }
  }

  disableMap(){

  }

  /**
   * @author SSW
   * @description this function is used adding Marker
   */
  addMarker(){
    try{

    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used setting center of map
   */
  setCenter(){
    try{

    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used of getting All Instances of Active maps
   */
  getAllMaps(){
    try{

    }catch(error){
      console.error(error);
    }
  }

  /**
   * @author SSW
   * @description this function is used for showing Marker info
   */
  showMarkerInfo(){
    try{

    }catch(error){
      console.error(error);
    }
  }
}
