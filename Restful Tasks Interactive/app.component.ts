import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';

  constructor(private _httpService: HttpService){}
  abilities: string[];
  // pokemon: string[];
  pokes: string[];
  pokemons: string[];
  list: boolean = false;
  list2: boolean = false;
  ngOnInit(){
  	this.getPokemonFromService();
  	// this.chlorophyllFromService();
  }  
  getPokemonFromService(){
  	let bulbasaur = this._httpService.getPokemon();
  	// let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
	bulbasaur.subscribe((data) => {
		console.log("Ugh not bulbasaur", data)
  	// this._httpService.getPokemon();
  	// this.pokemon = data['forms'];
  	this.abilities = data['abilities'];
	});
  }
  chlorophyllFromService(){
  	// this.list = true;
  	let temp = this._httpService.chlorophyll();
  	temp.subscribe((results) => {
  		console.log(results)  	
  	this.pokes = results['pokemon'];
  	this.list = true;
  	});  	
  }
  overgrowFromService(){
  	let temp = this._httpService.chlorophyll();
  	temp.subscribe((results) => {
  		console.log(results)  	
  	this.pokemons = results['pokemon'];
  	this.list2 = true;
  	});
  }
  hide(){
  	this.list=false;
  	this.list2=false;
  }
}