import { Component } from '@angular/core';
import { login, signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean=true;

  constructor(private user:UserService){}

  noOnInit():void{
    this.user.userAuthload();
  }
  signUp(data:signUp){
    this.user.userSignUp(data)
  }

  login(data:login){
    this.user.userLogin(data)
  }

  openSignUp(){
    this.showLogin=false
  }

  openLogin(){
    this.showLogin=true;
  }

}
