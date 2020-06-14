import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CartService} from '../cart.service'; 

@Component({
  selector: 'app-dialog-place-order',
  templateUrl: './dialog-place-order.component.html',
  styleUrls: ['./dialog-place-order.component.css']
})
export class DialogPlaceOrderComponent implements OnInit {
  form: FormGroup;
  description:string;

  constructor(public cartService: CartService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogPlaceOrderComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
      
  });
  }

  save() {
    this.cartService.clearCart();
    this.dialogRef.close(this.form.value);
    
  }

close() {
    this.dialogRef.close();
  }

}
