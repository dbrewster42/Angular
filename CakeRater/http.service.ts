import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
	getCakes(){
		return this._http.get('/cakes');
	}
	addCake(newCake: any){
		return this._http.post('/cakes', newCake);
	}
	getOneCake(_id: string){
		return this._http.get(`/cakes/${_id}`);
	}
	addRating(_id: string, newRating: any){
		return this._http.post(`/cakes/${_id}/rating`, newRating);
	}
}
