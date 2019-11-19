import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  constructor(private _httpService: HttpService){}
  cakes: string[];
  newCake: any = {baker: "", image: ""};
  newRating: any = {rating: 5, comment: "Post comment here"};
  selectedCake: any;
  avg : number;
  i : number;
  sum : number = 0;  
  _id: string;

  ngOnInit(){
	this.getCakesFromService();  	
  }
  getCakesFromService(){
  	let temp = this._httpService.getCakes();
  	temp.subscribe(data => {
  		console.log("all", data);
  		this.cakes = data['data'];
  	});
  }
  onCake(){
  	let temp = this._httpService.addCake(this.newCake);
  	temp.subscribe(data => {
  		console.log("Create", data);
  		this.newCake = {baker: "", image: ""};
  		this.getCakesFromService();
  	})
  }
  onRate(cake){
  	this._id = cake._id;  	
  	console.log(cake);
  	console.log('2', this._id);
  	let temp = this._httpService.addRating(this._id, this.newRating);
  	temp.subscribe(data => {
  		console.log("R Create", data);
  		this.newRating = {rating: '', comment: ''};
  		// this.newRating = {rating: req.params.rating, comment: req.params.comment};
  		this.getCakesFromService();
  	});

  }
 
  info(cake){
  	this.selectedCake = cake;
  	console.log(this.selectedCake);
  	// this.getCakeDetails(this.selectedCake);
  	this._id = cake._id;
  	console.log(this._id);
  	for (let i in this.selectedCake.rating){
  		this.sum += this.selectedCake.rating[i].rating;
  		console.log(this.sum, typeof this.sum);
  	}
  	this.avg = this.sum / this.selectedCake.rating.length;
  	console.log('2', this.avg);
  	// this.cakeToShow();
  	
  }
 // getCakeDetails(cake){
  // 	this._id = cake._id;
  // 	console.log(this._id);
  // 	let temp = this._httpService.getOneCake(this._id);
  // 	temp.subscribe(data => {
  // 		console.log("got cake", data);
  // 		this.oneCake = data['data'];
  // 	})
  // }

}
