import {Component, OnInit} from '@angular/core';
import {SendMailService} from '../send-mail.service';
import {CartService} from '../cart.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogPlaceOrderComponent } from '../dialog-place-order/dialog-place-order.component';

export interface PlaceOrderForm {
  SenderName: string;
  SenderId: string;
  ReceipientId: string;
  //Address: string;
  InvoiceNumber:string;
  Phone:string;
  CallType:string;  
}




@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})


export class PlaceOrderComponent  implements OnInit {
  public ownerForm: FormGroup;
  public ordNumber ;
  result: any;
  constructor(private dialog: MatDialog,  public sendMail :SendMailService, public cartService:CartService ) { 
    
  }
 
  openDialog() {

    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.data = {
      id: 1,
      description: 'Thank you for shopping with us ! Your order is successfully placed and order number is : '+this.ordNumber+'. We will deliver the order in  next 2 working days at provided address. Kindly keep checking your mail for further update.'  
  };

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

      this.dialog.open(DialogPlaceOrderComponent, dialogConfig);
}
  


  ngOnInit() {
    this.ordNumber = Math.ceil(Math.random() * 10000); 
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      emailId : new FormControl('', [Validators.required, Validators.email ]),
      phoneNumber : new FormControl('', [Validators.required, Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }
 
  getErrorMessage() {
    return this.ownerForm.controls["emailId"].hasError("required");
      }


  public onCancel = () => {
    //this.location.back();
  }
 
  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }
 
  private executeOwnerCreation = (ownerFormValue) => {

    let ord: PlaceOrderForm = {
      SenderName: ownerFormValue.name,
      SenderId: ownerFormValue.emailId,
      ReceipientId:'ajitkolhe@gmail.com',
      //Address: ownerFormValue.address,
      Phone:ownerFormValue.phoneNumber,
      InvoiceNumber:""+this.ordNumber,
      CallType:"SendMail",
    }

    
    /*alert("you are here"+ ord.SenderName + "\n result:"+ 

    +"\n "+ ord.SenderId+"- ownerFormValue.emailId,"
    +"\n "+ ord.ReceipientId+"-ord.ReceipientId"
    +"\n "+ ord.Address+"-ownerFormValue.address"
    +"\n "+ ord.Phone+"-ownerFormValue.phoneNumber"
    +"\n "+ ord.InvoiceNumber+"-this.ordNumber");
*/

   var result; 
    var responsDtl = this.sendMail.sendMailRequest(this.cartService.getItems() , ord).subscribe(resultSet => this.result.push(resultSet));;
    

    this.openDialog(); 

  }



}

