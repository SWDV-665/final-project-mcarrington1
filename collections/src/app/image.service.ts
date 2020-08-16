import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http'; // TEMPORARY
import { Observable } from 'rxjs'; // TEMPORARY
import { File } from "@ionic-native/file/ngx";


 //image to be displayed in template

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  capturedSnapURL:string;
  image;
  imageData;

  // cameraOptions: CameraOptions = {
  //   quality: 20,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

  constructor(private camera: Camera, private http: HttpClient, private file: File) { }

  /// NEW

  async pickImage() {
    try {
      const options: CameraOptions = {
        quality: 80,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.ALLMEDIA,
        // sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
      };

      let cameraInfo = await this.camera.getPicture(options);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);

      this.uploadBlob(blobInfo);

      // let uploadInfo: any = await this.uploadToFirebase(blobInfo);

      alert("File Upload Success ");
    } catch (e) {
      console.log(e.message);
      alert("File Upload Error " + e.message);
    }
  }

  // FILE STUFF
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

  uploadBlob(imageBlob){
    let url = 'http://localhost:8080/uploadphoto';
    const date = new Date().valueOf();
  
    // Replace extension according to your media type
    const imageName = date+ '.jpg';
    // call method that creates a blob from dataUri
    // const imageBlob = this.dataURItoBlob(this.imageData);
    // const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' })
  
    let formData = new FormData();

    console.log('Image file contents :: ' + imageBlob)
    formData.append('picture', imageBlob);

    const headers = {
      'enctype': 'multipart/form-data;',
    };


    let data:Observable<any> = this.http.post(url, formData, {headers: headers});
    data.subscribe((result) => {
      console.log(result);
    });
  }

  /// OLD

  takeSnap() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
     }
  
      this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
      }, (err) => {
         // Handle error
         alert("error "+JSON.stringify(err))
    });
  }


  // upload(){
  //   let url = 'http://localhost:8080/upload';
  //   const date = new Date().valueOf();
  
  //   // Replace extension according to your media type
  //   const imageName = date+ '.jpeg';
  //   // call method that creates a blob from dataUri
  //   const imageBlob = this.dataURItoBlob(this.imageData);
  //   const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' })
  
  //   let  postData = new FormData();

  //   console.log()
  //   console.log('Image file contents :: ' + imageFile)
  //   postData.append('file', imageFile);
  
  //   let data:Observable<any> = this.http.post(url,postData);
  //   data.subscribe((result) => {
  //     console.log(result);
  //   });
  // }

  dataURItoBlob(dataURI) {
    console.log('DataURI is :: ' + dataURI)
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
     }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    console.log("Blob is :: " + blob);
   return blob;
  }

}
