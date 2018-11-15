import { Component } from '@angular/core';
import { StateManager } from './common/StateManager';
import { Location } from '@angular/common';
import { SwPush } from "@angular/service-worker";
// import SwPush = require("@angular/service-worker");
declare var CryptoJS:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  readonly VAPID_PUBLIC_KEY = "BA08CYw1WPNcMruNuGLWG29Di94jEkp3W_U_IFKqpIOflwVCOJvsf5nC7aCk_sYNkt_nRVauxzminUH_bNyk8Oc";


  AccountNumber:number;
  SortCode:number;
  disAccNo:any = "Account Number : ";
  disSortCode:any = "Sort Code : ";
  message:string = "";

  mapStyle = {
    "width":"60%",
    "height":"400px"
  }

  onSave(){
    try{
        console.log("Account Number : ",this.AccountNumber);
        console.log("Sort Code : ",this.SortCode);
        this.disAccNo += this.AccountNumber;
        this.disSortCode += this.SortCode;

    }catch{
      console.error("Error");
    }
  }


  getBytes(iText:string){
    var bytes = [];
    for (var i = 0; i < iText.length; ++i){
        bytes.push(iText.charCodeAt(i));
    }
    return bytes;
  }

  encrypt(){
    // Approach 1
    var keyHex = CryptoJS.enc.Base64.parse("E$@Efd45$#Wddsf#0WSdPSD4");
    let plainKey = "E$@Efd45$#Wddsf#0WSdPSD4";
    let plainIv = "5%&ERfd4";
    console.log(keyHex);
    //var iv = CryptoJS.enc.Base64.parse("5%&ERfd4");
    //var iv = CryptoJS.enc.Utf8.parse("5%&ERfd4");

	    	/*var encryptd = CryptoJS.TripleDES.encrypt(this.message, keyHex, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });*/

    // Approach 2
    //var keyWords = CryptoJS.enc.Utf8.parse(plainKey);
    //var iv = CryptoJS.enc.Utf8.parse(plainIv);
    var keyWords = CryptoJS.enc.Latin1.parse(plainKey);
    var iv = CryptoJS.enc.Latin1.parse(plainIv);
    console.log(keyWords);
    console.log(iv);
    //var keyWords = this.getBytes(plainKey);
    var messageWords = CryptoJS.enc.Utf8.parse(this.message);
    console.log(messageWords);
    //var desEncryptor = CryptoJS.algo.TripleDES.createEncryptor(keyWords,iv);
    //console.log(desEncryptor);
    var encrypted = CryptoJS.TripleDES.encrypt(messageWords, keyWords, { iv: iv });
    console.log(encrypted);
    var ciphertext = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    console.log(ciphertext);
    //var ivWords = CryptoJS.lib.WordArray.create(iv);
        //var encryptd = CryptoJS.TripleDES.encrypt(this.message, keyHex);
        //console.log(encryptd.ciphertext.toString());
        this.message = ciphertext;
        //this.message = encryptd.toString();
  }

  decrypt(){
    var keyHex = CryptoJS.enc.Base64.parse("E$@Efd45$#Wddsf#0WSdPSD4");
    let plainIv = "5%&ERfd4";
    var iv = CryptoJS.enc.Base64.parse("5%&ERfd4");
    let plainKey = "E$@Efd45$#Wddsf#0WSdPSD4";

    /*var decrypted = CryptoJS.TripleDES.decrypt(this.message,keyHex,{
      iv: iv,
      mode: CryptoJS.mode.CBC,
	    padding: CryptoJS.pad.Pkcs7
    });*/


    //var keyWords = CryptoJS.enc.Utf8.parse(plainKey);
    var keyWords = CryptoJS.enc.Latin1.parse(plainKey);
    var iv = CryptoJS.enc.Latin1.parse(plainIv);
    console.log(keyWords);
    console.log(iv);
    //var messageWords = CryptoJS.enc.Utf8.parse(this.message);
    //var messageWords = CryptoJS.enc.Base64.parse(this.message);
    //console.log(messageWords);
    //var desDecryptor = CryptoJS.algo.TripleDES.createEncryptor(keyWords,iv);
    //console.log(desDecryptor);
    var decrypted = CryptoJS.TripleDES.decrypt(this.message, keyWords, { iv: iv });
    console.log(decrypted)
    var plainText = CryptoJS.enc.Utf8.stringify(decrypted);
    console.log(plainText);
    //var decrypted = CryptoJS.TripleDES.decrypt(this.message,plainKey)
    //console.log(decrypted.toString(CryptoJS.enc.Base64));
    this.message = plainText;
  }

  back(){
    try{
      this.state.goBack();
    }catch(error){
      console.error(error);
    }
  }

  forward(){
    try{
      this.state.goForward();
    }catch(error){
      console.error(error);
    }
  }

  go(){
    try{
      this.state.go("localhost:4201/register");
    }catch(error){
      console.error(error);
    }
  }
state:StateManager;
  constructor(private swPush:SwPush , private location:Location){
      //this.state = new StateManager(location);
      console.log(this.state);
  }

  onSelect(iEvent){
    try{
      this.roll = iEvent;
    }catch(error){
      console.error(error);
    }
  }

  placeholder:string = "Name";
  id:any;
  roll:any;
  setId(){
    this.id = this.roll;
  }
  list:Array<any> = [];
  ngOnInit(){
    this.list = this.getAddress();
  }

  subscribeToNotifications(){
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
  })
  .then(sub => console.log(sub))
  .catch(err => console.error("Could not subscribe to notifications", err));
  }



  /**
   * @description dummy data
   */
    getAddress(){
      try{
        return [
          {
            woStatus:"New",
            woTitle:"2 X TV install upto  32",
            woPostCode:"W8 6",
            woDate: new Date(),
            woTime:"08:00 AM - 11:00 AM",
            woPrice:"50.00",
            bidPrice:"56.00",
            latlng:{
              lat:12.651805,
              lng:77.208946
            }
          },
          {
            woStatus:"Draft",
            woTitle:"Antivirus Install and Uninstall",
            woPostCode:"WR5 3DA",
            woDate: new Date(),
            woTime:"11:00 AM - 16:00 AM",
            woPrice:"100.00",
            bidPrice:"99.00",
            latlng:{
              lat:9.383452,
              lng:76.574059
            }
          },
          {
            woStatus:"Approved",
            woTitle:"PC Installation and Update",
            woPostCode:"B33 8TH",
            woDate: new Date(),
            woTime:"08:00 AM - 11:00 AM",
            woPrice:"75.00",
            bidPrice:"81.00",
            latlng:{
              lat:15.852792,
              lng:74.498703
            }
          },
          {
            woStatus:"Deleted",
            woTitle:"Plumbing and Cleaning",
            woPostCode:"W8 6",
            woDate: new Date(),
            woTime:"08:00 AM - 11:00 AM",
            woPrice:"20.00",
            bidPrice:"22.00",
            latlng:{
              lat:30.172716,
              lng:77.299492
            }
          }
        ]
      }catch(error){
        console.error(error);
      }
    }

}
