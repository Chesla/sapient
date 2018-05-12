import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchGames} from'./actions/gameaction';
import GameStores from './stores/gamestores';
import Platforms from'./pages/platforms';
import SearchBox from './pages/searchbox';
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            platform:{},
            items: 12,
            loadingState: false
        }
        this._getGameStores = this._getGameStores.bind(this);
    }
    componentDidMount(){
        GameStores.on('change',this._getGameStores);
        fetchGames();

        this.refs.iScroll.addEventListener("scroll", () => {
            if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight){
              this.loadMoreItems();
            }
        });
    }
    componentWillUnmount(){
         GameStores.removeListener('change',this._getGameStores);
    }
    _getGameStores(type){
        if(type==='GAMES_FETCHED'){
            this.setState({
                platform:GameStores._getPlatforms()||{}
            })
        }
    }
    loadMoreItems() {
        if(this.state.loadingState){
            return;
        }
        
        let {platform,items} = this.state;
        let nop= Object.keys(platform).length;
        let sum = 0;
        if(items<(nop-12)){
            sum = 12;
        }else{
            sum = nop-items;
        }
        if(sum){
            this.setState({ loadingState: true });
            setTimeout(() => {
                this.setState({ items: this.state.items + sum, loadingState: false });
            }, 1000);
        }
        
    }
    
    displayPlatforms(){
        let {platform,items} = this.state;
        let platforms=[],j=0;
        if(platform.length==0){
            return null;
        }
        for(let i in platform){
            if(j<=items){
                platforms.push(
                    <Platforms
                        key={i}
                        title={i}
                        count={platform[i].length}/>
                )
            }
            j++;
        }
        return platforms;
    }
    render() {
        return (
          <div className="App">
            <SearchBox/>
            <div className="mainCnt"    
                ref="iScroll">
                {this.displayPlatforms()}
                {this.state.loadingState ? <p className="loading"> loading More Items..</p> : ""}
            </div>
          </div>
        );
    }
}

export default App;
