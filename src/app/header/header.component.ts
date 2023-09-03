import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult:undefined|product[];
  userName:string="";
  cartItems=0;

  constructor(private route: Router, private product: ProductService){}
  ngOnInit(): void{
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType='seller'
          let sellerStorage = localStorage.getItem('seller')
          let sellerData  = sellerStorage && JSON.parse(sellerStorage)[0]
          this.sellerName = sellerData.name
        }else if(localStorage.getItem('user')){
          let userStore=localStorage.getItem('user');
          let userData=userStore && JSON.parse(userStore)
          this.userName= userData.name
          this.menuType='user'
        }
        else{
          this.menuType='default'
        }
      }
    })
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })
  }
  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.product.searchProducts(element.value).subscribe((result)=>{
        // console.log(result);
        if(result.length>5){
          result.length=5;
        }
        
        this.searchResult = result
      })
    }
  }

  hideSearch(){
    this.searchResult=undefined
  }

  submitSearch(val:string){
    console.log(val);
    this.route.navigate([`search/${val}`])
  }

  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }

}
