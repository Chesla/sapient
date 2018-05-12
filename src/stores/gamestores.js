import {EventEmitter} from "events";
import dispatcher from "../dispatchers/dispatcher";
class GameStores extends EventEmitter{
	constructor(){
		super();
		this.allGames=[];
		this.games=[];
		this.platforms={};
		this.searchItem='';
	}
	_setGames(games){
		let g = new Set();
		for(let i=0;i<games.length;i++){

			g.add(games[i].title+'');
			if(this.platforms[games[i].platform]){
				this.platforms[games[i].platform].push(games[i]);
			}else{
				this.platforms[games[i].platform]=[];
				this.platforms[games[i].platform].push(games[i]);
			}
		}
		this.allGames=games;
		this.games=Array.from(g);
		this.emit('change',"GAMES_FETCHED");
	}
	_filterGames(el){
		let games = this.allGames;
		this.platforms={};
		for(let i=0;i<games.length;i++){
			let title = games[i].title+'';
			title=title.toLowerCase();
			el=el.toLowerCase();
			if(title.includes(el))	{
				if(this.platforms[games[i].platform]){
					this.platforms[games[i].platform].push(games[i]);
				}else{
					this.platforms[games[i].platform]=[];
					this.platforms[games[i].platform].push(games[i]);
				}
			}		
			
		}
		this.emit('change',"GAMES_FILTERED");
	}
	sortItems(){
		for(let i in this.platforms){
			let items = Object.values(this.platforms[i]);
			items = items.sort((a,b)=>{
				return a.score-b.score
			})
			this.platforms[i]=items;
		}
		this.emit('change',"GAMES_SORTED");
	}
	reverseItems(){
		for(let i in this.platforms){
			let items = Object.values(this.platforms[i]);
			this.platforms[i]=items.reverse();
		}
		this.emit('change',"GAMES_REVERSED");
	}
	_getGames(type){
		return this.platforms[type];
	}
	_getGamesList(){
		return this.games;
	}
	_getPlatforms(){
		return this.platforms;
	}
	setSearchItem(el){

		if(el.trim()!==this.searchItem){
			this.searchItem=el;
			this._filterGames(el);
			this.emit('change',"SEARCH_ITEM");
		}
	}
	getSearchItem(){
		return this.searchItem;
	}
	_handleActions(action){
		switch(action.type){
			case 'FETCHED_GAMES' : {
				this._setGames(action.data);
				break;
			}
			case 'PLANET_DETAILS' :{
				this._planets(action.count,action.planet);
				break;
			}
			case 'TIME_LAPSED':{
				this.planets = [];
				this.emit('change','TIME_LAPSED');
				break;
			}
		}
	}
}

const gameStores = new GameStores();
dispatcher.register(gameStores._handleActions.bind(gameStores));
export default gameStores;
