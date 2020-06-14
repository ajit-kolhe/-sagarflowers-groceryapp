import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class SendMailService {
  private REST_API_SERVER = "https://whispering-cliffs-29153.herokuapp.com/getProducts";
  // private REST_API_SERVER = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  public sendMailRequest(pBody, pHeaders){

    /*let reqHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache',
      'SenderName':'Rakesh Roshan',
      'SenderId':'ajit.kolhe@intellectdesign.com',
      'ReceipientId':'ajitkolhe@gmail.com',
      'InvoiceNumber':'1234',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    });*/

    
    /*let headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'key': 'x-api-key',
      'SenderName': pHeaders.SenderName,
      'SenderId': pHeaders.SenderId,
      'ReceipientId':'ajitkolhe@gmail.com',
      'Address': pHeaders.Address,
      'Phone':pHeaders.Phone,
      'InvoiceNumber':pHeaders.InvoiceNumber,
    });*/



    let reqBody = pBody; 
    let reqHeaders = new HttpHeaders(pHeaders);
    reqHeaders.append('Content-Type','application/json');
    reqHeaders.append('InvoiceNumber',pHeaders.InvoiceNumber);
    /*reqHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
    reqHeaders.append('Access-Control-Allow-Methods', 'POST');
    reqHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    
*/
    var appendURL ="";
     return this.httpClient.post<Order[]>(this.REST_API_SERVER, reqBody, 
       { headers: reqHeaders, observe: "response"}).pipe(retry(3), 
       catchError(this.handleError), tap(res => {
    }));





   }


   handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}



export class Order {
  NAME:string;
  DESC: string;
  PRICE: string;
  quantity: string;

}