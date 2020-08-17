import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private camera: Camera) { }

  // Grab image
  async getImage() {

    let picture;

    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false
    }
    picture = 'data:image/jpeg;base64,' + await this.camera.getPicture(options);

    return picture;
  }
}
