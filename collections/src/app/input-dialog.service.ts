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
      // cssClass: 'custom-alert',
      header: collection? 'Edit Collection' : 'Add Collection',
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
        },
        {
          name: 'condition',
          type: 'text',
          value: collection? collection.condition: null,
          placeholder: 'Condition'
        },
        {
          name: 'quantity',
          type: 'number',
          value: collection? collection.quantity: null,
          placeholder: 'Quantity'
        }
      ],
      
      buttons: [
        {
          text: 'Add Image',
          handler: data => {
            console.log('Capture Image clicked');
            // this.imageService.pickImage();
            // TODO: Populate the collection.image reference here

              // let imageReference = this.imageService.getImage();
              // console.log(imageReference);
              // data.image = imageReference;

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

              // TODO: additional fields are missing
              collection.name = data.name;
              collection.description = data.description;
            
              this.dataService.editCollection(collection, index);
            }
            else {
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