import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CollectionsService } from '../collections.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ImageService } from '../image.service'; // DELETE

// Modal
import { ModalController } from '@ionic/angular';
import { CollectionDetailPage } from '../modals/collection-detail/collection-detail.page';
import { CollectionCreatePage } from '../modals/collection-create/collection-create.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  title = "Collection"
  
  collections = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: CollectionsService, public inputDialogService: InputDialogService, public imageService: ImageService, public modalController: ModalController) {
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

  // modal
  // TODO: Rename?
  async openModal(collection) {
    const modal = await this.modalController.create({
      component: CollectionDetailPage,
      componentProps: {
        "itemName": collection.name,
        "itemDescription": collection.description,
        "itemCondition": collection.condition,
        "itemQuantity": collection.quantity,
        "itemImage": collection.image,
        "itemBarcode": collection.barcode
      }
    });
    return await modal.present();
  }

  async openCreateModal() {
    const modal = await this.modalController.create({
      component: CollectionCreatePage,
    });
    return await modal.present();
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

 // In for Debug Purposes
 async takePhoto() {
   console.log('take photo button pressed')
   
   this.imageService.pickImage();
 }
}