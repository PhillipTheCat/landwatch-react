import React from "react";

import MapContainer from '../Maps/MapContainer'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


import './county.css'


class County extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            land_items: []
        }
    }

componentWillMount() {
    console.log(this.props.match.params.name)

}

componentDidMount() {
    this.getCounty()
}

currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

getCounty = () => {
    var county = this.props.match.params.name.toUpperCase()

    var url = "http://localhost:3001/county/"+county
    console.log("calling " + url)
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
            this.setState({
                land_items: result
            })
        }
    )
}
render() {
    var latList = []
    var longList = []
    for(var i = 0; i <  this.state.land_items.length; i++){
        latList.push(this.state.land_items[i].latitude)
        longList.push(this.state.land_items[i].longitude)
    }
    console.log("land items: " + this.state.land_items[0])
    console.log(latList)
    console.log(longList)


    const name = this.props.match.params.name
    const land_items = this.state.land_items;
    console.log("sending land props to Map as " + land_items)
    // <div class="land-item">
    //     <div>{this.currencyFormat(item.PRICE)} - {item.ACRES} acres </div>
    //     <div>{item.URL}</div>
    // </div>
    //)
    return (
        <div>
           <h3> {name} County </h3>
           <MapContainer lats={latList} longs={longList} land={land_items}/> 
        </div>
    );
}
}
export default County