import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CartService } from '../cart.service'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

export interface PeriodicElement {
  IMAGE_PATH: string;
  PRICE: string;
  CATEGORY: string;
  PRODUCT_ID: string;
  DESC: string;
  NAME: string;
}

const ELEMENT_DATA : PeriodicElement[] =[
  {
      "IMAGE_PATH": "assets/Colgate.jpg",
      "PRICE": "15",
      "CATEGORY": "General",
      "PRODUCT_ID": "1",
      "DESC": "Colgate dant manjan",
      "NAME": "Colgate"
  },
  {
      "IMAGE_PATH": "assets/AshirwadAtta.jpg",
      "PRICE": "420",
      "CATEGORY": "General",
      "PRODUCT_ID": "2",
      "DESC": "10 kg Ashirwad atta",
      "NAME": "Ashirwad Atta"
  },
  {
      "IMAGE_PATH": "assets/Dates.png",
      "PRICE": "120",
      "CATEGORY": "General",
      "PRODUCT_ID": "3",
      "DESC": "King dates half kg packet",
      "NAME": "King dates "
  },
  {
      "IMAGE_PATH": "assets/Fortune Oil.jpg",
      "PRICE": "140",
      "CATEGORY": "General",
      "PRODUCT_ID": "4",
      "DESC": "1 lit fortune oil bag",
      "NAME": "Fortune Oil"
  },
  {
      "IMAGE_PATH": "assets/MachisBox.jpg",
      "PRICE": "10",
      "CATEGORY": "General",
      "PRODUCT_ID": "5",
      "DESC": "",
      "NAME": "Machis Box"
  },
  {
      "IMAGE_PATH": "assets/MarieGold.jpg",
      "PRICE": "30",
      "CATEGORY": "General",
      "PRODUCT_ID": "6",
      "DESC": "Vita Marie gold biscut",
      "NAME": "MarieGol"
  },
  {
      "IMAGE_PATH": "assets/onion.png",
      "PRICE": "60",
      "CATEGORY": "General",
      "PRODUCT_ID": "7",
      "DESC": "5 kg onion bag",
      "NAME": "Onion"
  },
  {
      "IMAGE_PATH": "assets/Rice.jpg",
      "PRICE": "300",
      "CATEGORY": "General",
      "PRODUCT_ID": "8",
      "DESC": "5 kg rice bag",
      "NAME": "Rice"
  },
  {
      "IMAGE_PATH": "assets/Salt.jpg",
      "PRICE": "20",
      "CATEGORY": "General",
      "PRODUCT_ID": "9",
      "DESC": "1 kg tata salt",
      "NAME": "Tata Salt"
  },
  {
      "IMAGE_PATH": "assets/Sugar.jpg",
      "PRICE": "200",
      "CATEGORY": "General",
      "PRODUCT_ID": "10",
      "DESC": "5 kg sugar bag",
      "NAME": "Sugar"
  },
  {
      "IMAGE_PATH": "assets/Parle-G.jpg",
      "PRICE": "40",
      "CATEGORY": "General",
      "PRODUCT_ID": "11",
      "DESC": " Parle-G.jpg big packet",
      "NAME": "Parle-G"
  },
  {
      "IMAGE_PATH": "assets/apple.png",
      "PRICE": "10",
      "CATEGORY": "Fruits",
      "PRODUCT_ID": "12",
      "DESC": "Apples ",
      "NAME": "apple"
  },
  {
      "IMAGE_PATH": "assets/Bhedi.jpg",
      "PRICE": "20",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "13",
      "DESC": "Bhedi",
      "NAME": "Bhedi"
  },
  {
      "IMAGE_PATH": "assets/Broccoli.jpg",
      "PRICE": "15",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "14",
      "DESC": "Broccoli",
      "NAME": "Broccoli"
  },
  {
      "IMAGE_PATH": "assets/Carrets.jpg",
      "PRICE": "420",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "15",
      "DESC": "Carrets",
      "NAME": "Carrets"
  },
  {
      "IMAGE_PATH": "assets/cauliflower.jpg",
      "PRICE": "120",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "16",
      "DESC": "cauliflower",
      "NAME": "cauliflower"
  },
  {
      "IMAGE_PATH": "assets/cucumber.jpg",
      "PRICE": "140",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "17",
      "DESC": "cucumber",
      "NAME": "cucumber"
  },
  {
      "IMAGE_PATH": "assets/eggPlant.jpg",
      "PRICE": "10",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "18",
      "DESC": "eggPlant",
      "NAME": "eggPlant"
  },
  {
      "IMAGE_PATH": "assets/Lasun.jpg",
      "PRICE": "30",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "19",
      "DESC": "Lasun",
      "NAME": "Lasun"
  },
  {
      "IMAGE_PATH": "assets/mango.png",
      "PRICE": "60",
      "CATEGORY": "Fruits",
      "PRODUCT_ID": "20",
      "DESC": "mango",
      "NAME": "mango"
  },
  {
      "IMAGE_PATH": "assets/onion.png",
      "PRICE": "300",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "21",
      "DESC": "onion",
      "NAME": "onion"
  },
  {
      "IMAGE_PATH": "assets/pineapple.png",
      "PRICE": "20",
      "CATEGORY": "Fruits",
      "PRODUCT_ID": "22",
      "DESC": "pineapple",
      "NAME": "pineapple"
  },
  {
      "IMAGE_PATH": "assets/potatoes.jpg",
      "PRICE": "200",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "23",
      "DESC": "potatoes",
      "NAME": "potatoes"
  },
  {
      "IMAGE_PATH": "assets/Tomato.jpg",
      "PRICE": "40",
      "CATEGORY": "Vegetables",
      "PRODUCT_ID": "24",
      "DESC": "Tomato",
      "NAME": "Tomato"
  },
  {
      "IMAGE_PATH": "assets/Watermelon.jpg",
      "PRICE": "30",
      "CATEGORY": "Fruits",
      "PRODUCT_ID": "25",
      "DESC": "Watermelon",
      "NAME": "Watermelon"
  }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  category = [];
  limitCount = 5;   

  products = [];
  mainColletion = [];
  isValid = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  collection= [];

  constructor(private dataService: DataService, public cartService: CartService) { }

  ngOnInit(): void {
    var pCategory; 
    var cnt; 
    
    console.log("this.mainColletion.length:"+this.mainColletion.length);
    if (this.mainColletion.length == 0) {
      /*this.products = ELEMENT_DATA;
      console.log("this.products:"+this.products); 
      this.mainColletion =ELEMENT_DATA; // this.getHardCodeData();
      */
      
    this.dataService.sendGetRequest(pCategory).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
    //  this.dataService.sendGetRequest(pCategory).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{ 
      console.log(res);
      this.genProdArrData(res.body);
      cnt = this.products.length > this.limitCount? this.limitCount: this.products.length;
      for (var i = 0; i < cnt; i++) {
        this.products[i].quantity = this.cartService.getItemQuantity(this.products[i].PRODUCT_ID); 
        if (this.products[i].quantity> 0 ){
          this.isValid[this.products[i].PRODUCT_ID] = true; 
        } else {
          this.isValid[this.products[i].PRODUCT_ID] = false; 
        }
        this.collection.push(this.products[i]);
        console.log("this.collection:"+this.collection);
      }
    })  
  }
}

  genProdArrData(body: any) {
    /*if (this.cartService.getItemsLength() == 0 ) {
      this.products = body;
      this.mainColletion = body;
    } else {*/
      this.category.push('All'); 
      body.forEach(element => {

        if (this.category.indexOf(element.CATEGORY)==-1)
          this.category.push(element.CATEGORY);
          
        element.quantity = this.cartService.getItemQuantity (element.PRODUCT_ID); 
        this.products.push(element);
        this.mainColletion.push(element);
        //console.log("Element id :"+ element.PRODUCT_ID+ " Element Quantity:"+this.cartService.getItemQuantity (element.PRODUCT_ID));
      });
    //}

  }
  /*getHardCodeData(): any[] {
    return null; 

  
  }*/

  callCategory(pCategory:String): void {
    var cnt; 
    this.products = null; 
    this.collection = [];
    /// this.dataService.sendGetRequest(pCategory).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
    this.products = this.findProducts(pCategory);
    cnt = this.products.length > this.limitCount ? this.limitCount: this.products.length;
    for (var i = 0; i < cnt; i++) {
      this.collection.push(this.products[i]);
      console.log("this.collection:"+this.collection);
    }  
  }

  findProducts(pCategory: String): any[] {
    var retVar = [];
    console.log("pCategory.value:"+ pCategory);
    for (var i=0; i < this.mainColletion.length; i++)
    {

      if (this.mainColletion[i].CATEGORY ==pCategory || pCategory =="All" )
        retVar.push(this.mainColletion[i]);
    }
    return retVar; 
  }
  

 

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }


  /*chkProduct(product):boolean{
    console.log(product); 
    return false; 
  }*/

  chkProduct = function(product){
    //put the logic
    return false;
 }


  addToCart(product):void{
    console.log(product); 
    this.cartService.addToCart(product); 
    this.isValid[product.PRODUCT_ID] = true; 
  }

  removeToCart(product):void{
    console.log(product); 
    this.cartService.removeToCart(product);
    if (product.quantity==0) 
      this.isValid[product.PRODUCT_ID] = false; 
  }

  public firstPage() {
    var cnt; 
    this.collection = [];
    cnt = this.products.length > this.limitCount ? this.limitCount: this.products.length;
    for (var i = 0; i < cnt; i++) {
      this.collection.push(this.products[i]);
      console.log("this.collection:"+this.collection);
    }  
  }

  public previousPage() {
    var cnt, startPos, endPos; 
    console.log("start position: "+ this.collection[0].NAME)
    endPos = this.products.indexOf(this.collection[0]) ;
    startPos = (endPos - this.limitCount) < 0 ? 0:  (endPos - this.limitCount);  
    endPos = startPos + this.limitCount;  

    endPos = (endPos  > this.products.length) ? this.products.length : endPos ;
    //endPos = endPos < 0 ? this.limitCount : endPos;
    console.log("startPos:"+ startPos +" endPos:"+ endPos);
    cnt = endPos;
    this.collection = [];
    for (var i = startPos; i < cnt; i++) {
      this.collection.push(this.products[i]);
      console.log(i + " this.collection:"+this.collection);
    }  

  }

  public nextPage() {
    var cnt, startPos,endPos; 
    
    startPos = this.products.indexOf(this.collection[this.limitCount-1])+1;
    
    startPos = ((startPos+this.limitCount) > this.products.length) ? (this.products.length - this.limitCount) : startPos;
    endPos = startPos + this.limitCount;  

    startPos = (startPos < 0) ? 0 : startPos;
    endPos = (endPos  > this.products.length) ? this.products.length : endPos ;
    cnt =   endPos;  //this.products.length > endPos ? endPos: this.products.length;
    this.collection = [];
    console.log("startPos:"+startPos + "  endPos:"+ endPos + " this.products.length:"+ this.products.length); 
    for (var i = startPos; i < cnt; i++) {
      this.collection.push(this.products[i]);
      console.log("this.collection:"+this.collection);
    }  
  }
  public lastPage() {
    var cnt, startPos,endPos; 
    
    endPos = this.products.length;
    startPos = ((endPos - this.limitCount ) < 0) ? 0 : (endPos - this.limitCount );
    
    cnt =   endPos;  
    this.collection = [];
    console.log("startPos:"+startPos + "  endPos:"+ endPos + " this.products.length:"+ this.products.length); 
    for (var i = startPos; i < cnt; i++) {
      this.collection.push(this.products[i]);
      console.log("this.collection:"+this.collection);
    }  
  }

  addCategory(pCategory):void{
    console.log("Before calling dataservice"+pCategory);
    var  test;  
    console.log("Before calling dataservice"+pCategory);
    
    test = this.category.splice(this.category.indexOf(pCategory), 1, this.category[0]);
    test = this.category.splice(0, 1, pCategory);
    
    this.callCategory(pCategory);
  }

}
