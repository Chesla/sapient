import dispatcher from "../dispatchers/dispatcher";
const API = 'http://starlord.hackerearth.com/gamesext';
export function _fetchGames(){
        
        fetch(API)
            .then(response => response.json())
            .then(data => {
                dispatcher.dispatch({
                    type:'FETCHED_GAMES',
                    data:data||[]
                })
            }).catch(error=>{
                console.log('error',error);
            });
   
}