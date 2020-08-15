import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { CollectionsService } from './collections.service';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

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

  async showAlert(collection?, index?) {
    const alert = await this.alertCtrl.create({
      header: collection? 'Edit Collection' : 'Add Collection',
      message: collection? 'Please edit collection...' : "Please enter collection...",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: collection? collection.name : null
        },
        {
          name: 'description',
          type: 'text',
          value: collection? collection.description: null,
          placeholder: 'Description'
        }
      ],
      
      buttons: [
        {
          text: 'Add Image',
          handler: data => {
            console.log('Capture Image clicked');
            this.imageService.takeSnap();
            // TODO: Populate the collection.image reference here
            return false;
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, 
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked :: ', data);
            if (index !== undefined){

              collection.name = data.name;
              collection.description = data.description;
            
              this.dataService.editCollection(collection, index);
            }
            else{
              this.dataService.addCollection(data);
            }
          }
        }
      ]
    });

    await alert.present();
  }
  constructor(public dataService: CollectionsService, public alertCtrl: AlertController, public imageService: ImageService) { }
}