// my-modal.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.page.html',
  styleUrls: ['./collection-detail.page.scss'],
})
export class CollectionDetailPage implements OnInit {


  itemName: string;
  itemDescription: string;
  itemCondition: string;
  itemQuantity: number;
  itemImage: string;
  itemBarcode: number

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.itemName = this.navParams.data.itemName || "Unknown";
    this.itemDescription = this.navParams.data.itemDescription || "No known description";
    this.itemCondition = this.navParams.data.itemCondition || "No known condition";
    this.itemQuantity = this.navParams.data.itemQuantity || "Unknown";
    this.itemImage = this.navParams.data.itemImage || "";
    this.itemBarcode = this.navParams.data.itemBarcode || "No barcode";
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}