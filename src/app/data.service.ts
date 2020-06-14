import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { retry, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   private REST_API_SERVER = "https://whispering-cliffs-29153.herokuapp.com/getProducts";
  //   private REST_API_SERVER = "http://localhost:8080/getProducts";
  //private REST_API_SERVER = "/assets/shipping.json";
  //private REST_API_SERVER = "/groceryapp/assets/shipping.json";
  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";  

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(pCategory){
    //return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
     // Add safe, URL encoded_page parameter 
     //const options = { params: new HttpParams({fromString: "_page=1&_limit=2"}) };
     //return this.httpClient.get(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
     var appendURL ="";
     if (pCategory){
      appendURL = "category="+pCategory+"&_page=1&_limit=5";
     } else {
      appendURL = "_page=1&_limit=20"; 
     }

     return this.httpClient.get(this.REST_API_SERVER,
       {  params: new HttpParams({fromString: appendURL}), observe: "response"}).pipe(retry(3), 
       catchError(this.handleError), tap(res => {
   //  return this.httpClient.get(this.REST_API_SERVER, {   observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {         
      //console.log("Rers "+ res.headers.get('Link'));
      //this.parseLinkHeader(res.headers.get('Link'));
      //console.log(res.url);
      //this.parseLinkHeader(res.url);
    }));


   }
   parseLinkHeader(header) {
    var links = {};
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');

    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"]; 
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
