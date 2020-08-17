import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class CollectionsService {
  collections: any = [];
  
  dataChanged$ : Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    console.log('Hello Collections');
    
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getCollections(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/collections').pipe( map(this.extractData), catchError(this.handleError)
    );
  }

  private extractData(res: Response){
    let body = res;
    return (body || {}) as object[];
  }

  private handleError(error: Response | any){
    let errMsg : string;
    if(error instanceof Response){
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
 
  removeCollection(collection){
    console.log("Removing Collection :: ", collection)
    this.http.delete(this.baseURL + '/api/collections/' + collection._id).subscribe(res => {
      this.collections = res;
      this.dataChangeSubject.next(true);
    });
  }
 
  addCollection(collection){
    console.log("Adding Collection :: ", collection)
    this.http.post(this.baseURL+'/api/collections/', collection).subscribe(res => {
      this.collections = res;
      this.dataChangeSubject.next(true);
    });
  }
  
  editCollection(collection, index){
    console.log("Editing Collection :: ", collection)
    this.http.put(this.baseURL+'/api/collections/'+ collection._id, collection).subscribe(res => {
      this.collections[index] = res;
      this.dataChangeSubject.next(true);
    });
  }
}