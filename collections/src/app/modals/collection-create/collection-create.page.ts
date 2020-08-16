import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CollectionsService } from '../../collections.service';
import { ImageService } from '../../image.service';




@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.page.html',
  styleUrls: ['./collection-create.page.scss'],
})
export class CollectionCreatePage implements OnInit {

  // itemName: string = "default";
  // itemDescription: string;
  // itemCondition: string;
  // itemQuantity: number;
  // itemImage: string;
  // itemBarcode: number

  data: any = { 
    name: '', 
    description: '', 
    condition: '', 
    quantity: '',
    image: '' 
  };

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public dataService: CollectionsService,
    public imageService: ImageService
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    // this.itemName = this.navParams.data.itemName || "Unknown";
    // this.itemDescription = this.navParams.data.itemDescription || "No known description";
    // this.itemCondition = this.navParams.data.itemCondition || "No known condition";
    // this.itemQuantity = this.navParams.data.itemQuantity || "Unknown";
    // this.itemImage = this.navParams.data.itemImage || "No Image";
    // this.itemBarcode = this.navParams.data.itemBarcode || "No Barcode";
  }

  async capturePhoto() {
    this.data.image = await this.imageService.getImage();
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  // TODO: if we're handling updates, we need to make this conditional
  async submitData() {
    const onClosedData: string = "Wrapped Up!";
    this.dataService.addCollection(this.data);
    await this.modalController.dismiss(onClosedData);
  }

  determineModifyMode(collection?, index?) {
    if (collection != null) {
      this.data.name = collection.name;
      this.data.description = collection.description;
      this.data.condition = collection.condition;
      this.data.quantity = collection.quantity;
      this.data.image = collection.image;
    }
  }

  printDataDebug() {
    // this.data.name = 'default';
    // this.data.password = 'default';
    console.log("Data :: " + this.data)
  }
}