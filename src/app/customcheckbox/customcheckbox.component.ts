import { Component, OnInit,ViewChild,Renderer2 } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
//import { ViewChild } from 
@Component({
  selector: 'app-customcheckbox',
  templateUrl: './customcheckbox.component.html',
  styleUrls: ['./customcheckbox.component.css']
})
export class CustomcheckboxComponent implements ControlValueAccessor  {
  @ViewChild('span') span;
  constructor(private renderer:Renderer2) { }

  writeValue( obj : any ) : void {
    const div = this.span.nativeElement;
    //this.renderer.setProperty(div, 'textContent', value);
  }

  registerOnChange( fn : any ) : void {
   // this.onChange = fn;
  }

  setDisabledState( isDisabled : boolean ) : void {
    //const div = this.textarea.nativeElement;
    //const action = isDisabled ? 'addClass' : 'removeClass';
    //this.renderer[action](div, 'disabled');
  }
  registerOnTouched(fn:any){
    throw new Error("Method Not implemented");
  }
  ngOnInit() {
  }

}
