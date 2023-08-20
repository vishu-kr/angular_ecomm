import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData:undefined|product
  productQuantity:number=1

  constructor(private activateRoute:ActivatedRoute, private product:ProductService){}
  ngOnInit(): void{
    let productId = this.activateRoute.snapshot.paramMap.get('productId')
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productData=result
    })
  }
  handleQuantity(val:string){
    if(this.productQuantity<20 && val=='plus'){
      this.productQuantity +=1
    }
    if(this.productQuantity>1 && val=='minus'){
      this.productQuantity -=1
    }
    
  }
}
