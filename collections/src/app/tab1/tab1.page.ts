import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CollectionsService } from '../collections.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ImageService } from '../image.service'; // DELETE


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  title = "Collection"
  
  collections = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: CollectionsService, public inputDialogService: InputDialogService, public socialSharing: SocialSharing, public imageService: ImageService) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadCollections();
    });
  }
  
  ngOnInit() {
    console.log("Page loading...")
    this.loadCollections();
  }

  loadCollections() {
    this.dataService.getCollections()
      .subscribe(
        collections => this.collections = collections,
        error => this.errorMessage = <any>error
        );
  }

   // Add Collection
  addCollection() {
    console.log('Adding Collection...');
    this.inputDialogService.showAlert();
  } 

  // Edit Collection
  async editCollection(collection, index) {
    console.log('Edit collection Clicked - ', collection, index);
    this.inputDialogService.showAlert(collection, index);
  }

  // Remove Collection
 async removeCollection(collection) {
    console.log("Remove collection Button Clicked :: ", collection);
    this.inputDialogService.showAlertConfirmation(collection)
    //this.dataService.removeCollection(collection);
 }

 // DELETE
 async takePhoto() {
   console.log('take photo button pressed')
   
   this.imageService.pickImage();
 }

  // DELETE
  async uploadPhoto() {
    console.log('upload photo button pressed')
    // this.imageService.upload();
  }

 // Share Collection
 // TODO: Delete
 async shareCollection(collection, index){
  console.log("Sharing collection -", collection, index);
  const toast = await this.toastCtrl.create({
    message: 'Sharing collection - ' + index + " ...",
    duration: 3000
  });
  toast.present();
  
  let message = "Collection Item - Name : " + collection.name + " - Quantity: " + collection.quantity;
  let subject = "Shared via Groceries app";

  this.socialSharing.share(message, subject).then(() => {
    // Sharing via email is possible
    console.log("Shared successfully!")
  }).catch((error) => {
    // Sharing via email is not possible
    console.error("Error while sharing ", error)
  });
}
}