import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CollectionsService } from '../../collections.service';
import { ImageService } from '../../image.service';
import { Platform } from '@ionic/angular'; // remove
import { Device } from '@ionic-native/device/ngx';




@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.page.html',
  styleUrls: ['./collection-create.page.scss'],
})
export class CollectionCreatePage implements OnInit {

  data: any = { 
    name: '', 
    description: '', 
    condition: '', 
    quantity: '',
    image: null
  };

  collection;
  index;
  pageTitle = "Add New Item";
  devicePlatform: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public dataService: CollectionsService,
    public imageService: ImageService,
    public device: Device
  ) { 
      this.devicePlatform = device.platform; // this drives whether or not the camera functionality appears
  }

  ngOnInit() {
    console.table(this.navParams);

    this.collection = this.navParams.data.collection;
    this.index = this.navParams.data.index;

    this.determineModifyMode(this.collection, this.index);
  }

  // Grab image from our image service
  async capturePhoto() {
    this.data.image = await this.imageService.getImage();
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  // Submit data to our REST API
  async submitData() {
    const onClosedData: string = "Wrapped Up!";

    if (this.index === undefined) {
      this.dataService.addCollection(this.data);
      await this.modalController.dismiss(onClosedData);
    } else {
      this.dataService.editCollection(this.data, this.index);
      await this.modalController.dismiss(onClosedData);
    }
  }

  // This determines if we're going to create new or modify
  determineModifyMode(collection?, index?) {
    if (this.collection !== undefined) {
      console.log('setting values for edit mode');
      this.data.name = collection.name;
      this.data.description = collection.description;
      this.data.condition = collection.condition;
      this.data.quantity = collection.quantity;
      this.data.image = collection.image;
      this.data._id = collection._id;
      this.pageTitle = collection.name;
    }
  }
}