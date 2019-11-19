import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() cakeToShow: any;
  @Input() average: number;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	// this.showCake();
  	// this.sHOWCAKE();
  }
  // showCake(){
  // 	console.log(this.cakeToShow);
  // 	console.log(this.cakeToShow.rating.length);
  // 	for(let i = 0; i < this.cakeToShow.rating.length; i++)
  // 		this.sum += this.cakeToShow.rating[i].rating;
  // 	this.avg = this.sum/ this.cakeToShow.rating.length;
  // 	console.log(this.avg);

  // }
  // sHOWCAKE(){
  // 	console.log(this.cakeToShow);
  // 	console.log(this.cakeToShow.rating.length);
  // 	console.log('1', this.cakeToShow.rating[0].rating);
  // 	// console.log('2', this.cakeToShow.rating.rating[0]);
  // 	// console.log('3', this.cakeToShow.rating.[0]rating);
  // 	for (let i in this.cakeToShow.rating){
  // 		this.sum += this.cakeToShow.rating[i].rating;
  // 		console.log(this.sum, typeof this.sum);
  // 	}
  // 	this.avg = this.sum / this.cakeToShow.rating.length;
  // 	console.log('2', this.avg)
  // }





  // getCakeDetails(cake){
  // 	this._id = cake._id;
  // 	console.log(this._id);
  // 	let temp = this._httpService.getOneCake(this._id);
  // 	temp.subscribe(data => {
  // 		console.log("got cake", data);
  // 		this.cakeToShow = data['data'];
  // 	})
  // }

}
