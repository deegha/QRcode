import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QrCodeServiceProvider {

  emp_data : any;
  api_url:any;

  constructor(public http: Http) {
    this.api_url = "http://ualtpayment.ualink.lk/meg_env_employee";
  }

  sendEmpNo = (emp_number):any => {
    return new Promise(resolve => {
      this.http.get(this.api_url+"/"+emp_number)
        .map(res => res.json())
        .subscribe(data => {
          this.emp_data = data;
          resolve(this.emp_data);
        });                                                                                                                                                                                                                                                                                                             
    });
  }

  markAttendance = (attandance):any => {
    try{
      let headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      return new Promise((resolve) => {
        this.http.post(this.api_url,attandance,options).map(res=>res.json())
        .subscribe(data=>{
          resolve(data);
        });
      });
    }catch(err){
      return false;
    }
  } 
}
