import React, { Component } from 'react';
import GameStores from '../stores/gamestores';
import Games from'./games';

export default class Platform extends Component {
    constructor(props){
        super(props);
        this.state={
            searchItem:'',
            games:GameStores._getGames(props.title)
        }
        this._getGameStores = this._getGameStores.bind(this);
    }
    componentDidMount(){
        GameStores.on('change',this._getGameStores);
    }
    componentWillUnmount(){
         GameStores.removeListener('change',this._getGameStores);
    }
    _getGameStores(type){
        let {title} = this.props;
        if(type==='SEARCH_ITEM'){
            this.setState({
                searchItem:GameStores.getSearchItem()||'',
            })
        }
        else if(type=='GAMES_SORTED' || type=='GAMES_FILTERED' || type=='GAMES_REVERSED'){
            this.setState({
                games:GameStores._getGames(title)||[],
            })
        }
    }
    displayGames(){
        let {title} = this.props;
        let {searchItem,games} = this.state;
        // let games = GameStores._getGames(title);
        return games.map((g,i)=>{
                return( <Games 
                        key={`games-${i}`} 
                        gameDet={g}/>)
            })
    }
    render() {
        let {title,count} = this.props;
        return (
            <div className="headerCnt">
                <div className="headerTitle">
                    <div className="headerName">{title}: </div>
                    <div className="headerCount">{count} {count>1?'Games':'Game'}</div>
                </div>
                <div className="gamesMainCnt">
                    {this.displayGames()}
                </div>
            </div>
        );
    }
}

 
