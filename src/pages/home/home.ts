import { Component } from '@angular/core'; 
import { NavController,ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QrCodeServiceProvider } from '../../providers/qr-code-service/qr-code-service'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  emp_name : string;
  emp_spouse : boolean;
  emp_children : any = false;
  emp_title : string;
  epf_number : any;

  att_no_of_child : any = 0;
  spouse          : boolean;

  checkListData : any;
  tmessage: any;

  constructor(public  qrCodeServiceProvider : QrCodeServiceProvider,
              public  navCtrl: NavController,  
              private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController) {   
  }

  ionViewWillLoad() {
  }

  scan() {

    this.barcodeScanner.scan().then((barcodeData) => {
        let emp_no = barcodeData.text;
        // let emp_no = "45899";
        this.qrCodeServiceProvider.sendEmpNo(emp_no).then((response) => {
          var children = [];
          let data = response.emp_details;  
  
          if(!response.error){
            if(parseInt(data.no_of_child) > 0){
              for(var i=1; i < parseInt(data.no_of_child)+1; i++) {
                children.push(i);
              } 
              this.emp_children =  children; 
            }
               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            this.emp_name     =  data.first_name;
            this.emp_spouse   =  data.spouse;
            this.emp_title    =  data.title; 
            this.epf_number   =  emp_no;
          }else{
            this.tmessage  = response.message;
            this.presentToast();
          }
        });
    }, (err) => {
        this.tmessage  = err;
        this.presentToast();
    });
  }

  addSpouse = (event) => {
    if(event.checked) {
      this.spouse = true;
    }else{
      this.spouse = false;
    }
  }

  markAttendnce = () => {
    let attendace = {
      "att_no_of_child" : this.att_no_of_child,
      "spouse"  : this.spouse,
      "epf_no" : this.epf_number,
      "status": "yes"
    };

    this.qrCodeServiceProvider.markAttendance(attendace).then(response=>{
      if(!response.error){
          this.tmessage  = response.message;
          this.presentToast().then(() =>  location.reload());
      }else{
          this.tmessage  = response.message;
          this.presentToast().then(() =>  location.reload());
      }
    });
   
  }

  addChild = (event) => {
    if(event.checked) {
      this.att_no_of_child = this.att_no_of_child+1 
    }else{
      this.att_no_of_child = this.att_no_of_child-1
    }
  }

  presentToast() :any {
    let toast = this.toastCtrl.create({
      message: this.tmessage,
      duration: 1000,
      position: 'top'
    });

    return new Promise((resolve)=>{
      resolve(toast.present());
    }); 
  }
}
