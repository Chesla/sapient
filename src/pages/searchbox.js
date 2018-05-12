import React, { Component } from 'react';
import GameStores from '../stores/gamestores';
import search from '../search.svg';
import sort from '../sort.svg'

export default class SearchBox extends Component {
    constructor(props){
        super(props);
        this.state={
            searchItem:'',
            openSuggestion:false,
            itemsSorted:false,
            itemsSort:true
        }
        this.valueChange = this.valueChange.bind(this);
        this._getGameStores = this._getGameStores.bind(this);

    }
    componentDidMount(){
        GameStores.on('change',this._getGameStores);
    }
    componentWillUnmount(){
         GameStores.removeListener('change',this._getGameStores);
    }
    _getGameStores(type){
        if(type==='SEARCH_ITEM'){
            this.setState({
                searchItem:GameStores.getSearchItem()||'',
                openSuggestion:false
            })
        }
        else if(type==='GAMES_SORTED'){
            this.setState({
                itemsSorted:true,
                itemsSort:true
            })
        }
        else if(type==='GAMES_REVERSED'){
            this.setState({
                itemsSort:!this.state.itemsSort,
            })
        }
    }
    valueChange(ev){
       let val =  ev.target.value;
       if(val.length>=3){

            this.setState({
                searchItem:val,
                openSuggestion:true
            })
       }else{
            this.setState({
                searchItem:val,
                openSuggestion:false
            })
       }
    }
    showSuggestionList(){
        let {searchItem} = this.state;
        let searchList = GameStores._getGamesList()||[];
        if(searchItem===''){
            return null;
        }
        return searchList.filter((sl)=>{
            sl = sl.toLowerCase();
            searchItem = searchItem.toLowerCase();
            return sl.includes(searchItem);
        }).map((sl,i)=>{
            return <li className="suggestion-list" key={`${i}-${sl}`} onClick={()=>{GameStores.setSearchItem(sl)}}>{sl}</li>
        })
    }
    sortItems(){
        let {itemsSorted}=this.state;
        if(!itemsSorted){
            GameStores.sortItems();
        }else{
            GameStores.reverseItems();
        }
    }
    render() {
        let {searchItem,openSuggestion,itemsSort,itemsSorted} = this.state;
        return (
            <div className="searchHeader">

            <div>
                <div className="pr-title">Sapient Game Arena</div>
                <div className="searchBox">
                    <input 
                        className="search-input"
                        type="text"
                        value={searchItem}
                        onKeyUp={(ev)=>{
                            if(ev.keyCode===13 ){
                                GameStores.setSearchItem(searchItem)
                            }
                        }}
                        onChange={this.valueChange}/>
                    <img src={search} className="search-img"/>
                </div>
                <div className="sortHeader" onClick={()=>{this.sortItems()}}>
                    <div className={itemsSorted?"sort-title active":"sort-title"}>Scores</div>
                    <img src={sort} className={itemsSort?"sort-img":"sort-img inv"}/>
                </div>
            </div>
            <div>
                {openSuggestion ?
                    <ul className="suggestion-item">
                        {this.showSuggestionList()}
                    </ul>
                    :
                    null
                }
            </div>
            </div>
        );
    }
}

 
