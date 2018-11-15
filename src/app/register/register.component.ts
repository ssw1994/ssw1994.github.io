import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl} from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { Global } from "../shared/global";
interface user{
  username:string;
  email:string;
  mobile:number;
  password:string;
}

export class User{
  username:string;
  email:string;
  mobile:number;
  password:string;
  constructor(){
    this.username = null;
    this.email = null;
    this.mobile = null;
    this.password = null;
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  user:user = new User();
  showPassword:boolean = false;

  constructor(private fb:FormBuilder,private userService:UserService) {
    this.registerForm = this.fb.group({
      userName:['',[Validators.required]],
      email:['',Validators.compose([Validators.required])],
      mobile:['',Validators.compose([Validators.required,Validators.pattern(Global.MOBILE_REGEX)])],
      password:['',Validators.compose([Validators.required,Validators.pattern(Global.PASSWORD_REGEX)])],
      rePassword:['',[Validators.required,this.checkPassword.bind(this)]],
    });
   }

  ngOnInit() {
  }

  checkPassword(control:AbstractControl){
    try{
      if(control && control.value){
        let _parentForm = control.parent;
        if(_parentForm){
          if(control.value !== _parentForm.get('password').value){
            return {mismatch:true};
          }
        }
      }
      return false;
    }catch(error){
      console.error(error);
    }
  }

  register(iForm:FormGroup){
    if(iForm.valid){
      let user:user = this.user;
      this.userService.signup(user).subscribe((result)=>{
        console.log(result);
      })
    }
  }

}
