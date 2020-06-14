import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsId = [];
  itemsDtls = []; 
  constructor(private http: HttpClient){
    
  }

  addToCart(product) {
    var prodIndex = this.itemsId.indexOf(product.PRODUCT_ID); 
    if (product.quantity) 
      product.quantity ++ ; 
    else
      product.quantity = 1;

    console.log(product);
    //this.items[product.PRODUCT_ID] = product; 
    if (prodIndex ==-1){
      this.itemsId.push(product.PRODUCT_ID);
      this.itemsDtls.push(product); 
    } else {
       var test = this.itemsDtls.splice(prodIndex, 1, product);
    }
    
    console.log("this.items"+this.getItems());
    
  }


  removeToCart(product) {
    var indOf = this.itemsId.indexOf(product.PRODUCT_ID); 
    product.quantity -- ;
    if ( (product.quantity==0) && (indOf>-1)){
      this.itemsDtls.splice(indOf, 1);
      this.itemsId.splice(indOf, 1);
    } else 
      this.itemsDtls.splice(indOf, 1, product);
  }

  getItems() {
    return this.itemsDtls;
  }

  getItemQuantity(pProdId): any{
    var retVal = 0; 
    var indOf = this.itemsId.indexOf(pProdId); 
    if (indOf>-1){
      retVal = this.itemsDtls[indOf].quantity;
    }
    console.log("retVal:"+retVal);
    return retVal; 
  }


  clearCart() {
    this.itemsDtls = [];
    this.itemsId = [];
    return this.itemsDtls;
  }

  getItemsLength():number{
   return this.itemsId.length; 
  }  

}
