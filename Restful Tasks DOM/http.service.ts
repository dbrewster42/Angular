import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

	constructor(private _http: HttpClient) { 
		this.getPokemon();
		this.pokeAbilities();
		this.chlorophyll();
	}
	getPokemon(){
		 // let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
		 // bulbasaur.subscribe((data) => {
		 // 	console.log("Ugh not bulbasaur", data)
		 // })
		  return this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
	};
	pokeAbilities(){
		let pokemon = this._http.get("https://pokeapi.co/api/v2/pokemon/1/");
		pokemon.subscribe((data:any) => {
    		console.log(`${data.name}'s abilities are ${data.abilities[0].ability.name} and ${data.abilities[1].ability.name}.`);
    })

	};
	chlorophyll(){
    	return this._http.get("https://pokeapi.co/api/v2/ability/34/");
  	};
}
	// getPokemons(){
	// 	let pokemons = this._http.get("https://pokeapi.co/api/v2/pokemon");
	// 	pokemons.subscribe((data) => {		
	// 		for (var i = 0; i < 20; i++)
	// 			let eachPokemon = this._http.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
	// 		var count = 0;
	// 		for(var a in data.abilities){
	// 			if (data.abilities[a].ability.name == "chlorophyll")
	// 				count++;
	// 		eachPokemon.subscribe(console.log(`There are ${count} pokemon with chlorophyll abilities`));
	// 	})
	// 	}
	// }
	// geteachPokemons(){
	// 	for (i = 0; i < )
	// 	let pokemons = this._http.get("https://pokeapi.co/api/v2/pokemon")
		
	// }
	// chlorophyll(){
 //    	let chlorophyll = this._http.get("https://pokeapi.co/api/v2/ability/34/");
 //    	chlorophyll.subscribe((data) => {
 //      		console.log(`${data.pokemon.length} pokemon have the ${data.name} ability!`);
 //    })
 //  };
