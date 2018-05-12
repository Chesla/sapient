import React, { Component } from 'react';
export default class Games extends Component {
     render(){
        let {gameDet} = this.props;
        return(
            <div className="gamesCnt">
                <div className="gamesTitle">{gameDet.title}</div>
                <div className="gamesScore">
                    <div className="score-img">
                        <i className={gameDet.score>=5?"fa fa-star":"fa fa-star-half-o"}/>
                    </div>
                    <div className="score-pt">{gameDet.score}</div>
                </div>
                {gameDet.editors_choice.toUpperCase() ==='Y' ? 
                    <div>
                        <div className="gamesEC">Editors Choice</div>
                        <div className="triangle"/>
                    </div>
                    :null
                }
                <div className="gamesfooter">
                    <div className="gamesGenre">{gameDet.genre}</div>
                    <div className="gamesYear">{gameDet.release_year}</div>
                </div>
            </div>
        )
    }
}

 
