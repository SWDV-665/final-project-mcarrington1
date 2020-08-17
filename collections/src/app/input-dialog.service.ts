import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public dataService: CollectionsService, public alertCtrl: AlertController) { }

  async showAlertConfirmation(collection) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete ' + collection.name + '?',
    
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, 
        {
          text: 'Confirm',
          handler: data => {
            console.log('Confirm clicked :: ', data);
            this.dataService.removeCollection(collection);
          }
        }
      ]
    });
    await alert.present();
  }
}