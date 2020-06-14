import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CartService} from '../cart.service'; 

import { fromEventPattern } from 'rxjs';

export interface PeriodicElement {
  IMAGE_PATH: string;
  PRICE: string;
  CATEGORY: string;
  PRODUCT_ID: string;
  DESC: string;
  NAME: string;
}




@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    public ELEMENT_DATA = [];
    displayedColumns: string[] = [  'NAME', 'DESC', 'PRICE', 'QUANTITY', 'TOTAL'];
    //displayedColumns: string[] = [  'NAME', 'TOTAL'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    console.log("this.cartService.itemsDtls:"+ this.cartService.getItems);
    this.dataSource.paginator = this.paginator;
    var elements = this.cartService.itemsDtls;
    var ele ;
    elements.forEach(element => {
        console.log("element:"+ element.IMAGE_PATH);
        ele = new Object();
        ele.IMAGE_PATH = element.IMAGE_PATH; 
        ele.PRICE = element.PRICE; 
        ele.CATEGORY = element.CATEGORY; 
        ele.PRODUCT_ID = element.PRODUCT_ID; 
        ele.DESC = element.DESC;
        ele.NAME = element.NAME;
        ele.QUANTITY = element.quantity;
        ele.TOTAL = element.PRICE * element.quantity;
        this.ELEMENT_DATA.push(ele);
    });
  }

  constructor( public cartService: CartService) { }

  getTotalCost() {
    return this.ELEMENT_DATA.map(t => t.TOTAL).reduce((acc, TOTAL) => {
        return acc + TOTAL;
    }, 0);
  }

}
