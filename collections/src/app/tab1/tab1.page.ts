import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CollectionsService } from '../collections.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
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

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public dataService: CollectionsService, 
    public inputDialogService: InputDialogService, 
    public modalController: ModalController) {
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
  async openDetailModal(collection) {
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

  // Open Add Modal
  async openAddModal() {
    const modal = await this.modalController.create({
      component: CollectionCreatePage,
    });
    return await modal.present();
  }

  // Open Edit Modal
  async openEditModal(collection, index) {
    const modal = await this.modalController.create({
      component: CollectionCreatePage,
      componentProps: {
        "collection": collection, 
        "index": index
      }
    });
    console.log('Collection sent is :: ' , collection);
    return await modal.present();
  }

  // Remove Collection
 async removeCollection(collection) {
    console.log("Remove collection Button Clicked :: ", collection);
    this.inputDialogService.showAlertConfirmation(collection)
 }
}