import React from 'react';
import {InfoWindow, Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 import './Map.css'
 
export class MapContainer extends React.Component {
  constructor (props) { 
    super(props); 
    this.onMarkerClick = this.onMarkerClick.bind(this); 
    //this.onMapClick = this.onMapClick.bind(this);
    this.displayMarkers = this.displayMarkers.bind(this); 
    this.items = props.land;
    this.state = { 
        lat: 40.6946768, 
        lng: -73.99161700000002, 
        showingInfoWindow: false, 
        activeMarker: {}, 
        selectedPlace: {}, 
        places: []
    } 
  } 

  currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  displayLandInfo() {
    var index = 0;
    return this.props.land.map((item) => {
      index = index + 1;
      return <div class='list-item'>
         <div> <span class='num'>{index}</span> - {item.ACRES} Acres</div>
        <div>{this.currencyFormat(item.PRICE)} </div>
        <div> {this.currencyFormat(item.PRICE_PER_ACRE)} per acre</div>
      </div>
    })

  }

  displayMarkers(landItems) {
    var labelIndex = 0;
    return landItems.map((item) => {
      labelIndex = labelIndex + 1;
      console.log("creating marker for " + JSON.stringify(item.PRICE))
      return <Marker  label={labelIndex.toString()} key={item.latitude} id={item.latitude} position={{lat: item.latitude, lng: item.longitude}} price={this.currencyFormat(item.PRICE)} acres={item.ACRES} price_per_acre={this.currencyFormat(item.PRICE_PER_ACRE)} name={"marker name"}
      onClick={this.onMarkerClick} /> 
    });
  };

  onMarkerClick (props, marker, e) { 
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }; 

  // onMapClick = (props) => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // }


  render() {
    const lats = this.props.lats
    const longs = this.props.longs
    var pairs = new Array();

 
    
    for(var i = 0; i < lats.length; i++){
      pairs.push({lat: lats[i], long: longs[i]})
    }



    return (
      <div id='map-container'>
        <div class="list">
          {this.displayLandInfo()}
        </div>
        <div id="map">
          <Map google={this.props.google} style = {{width: '60%', height: '60%', position: 'relative'}} zoom={10}  initialCenter={{
            lat: lats[0],
            lng: longs[0]
          }}>
            {this.displayMarkers(this.props.land)}

            <InfoWindow  marker = { this.state.activeMarker } visible = { this.state.showingInfoWindow }>
                      <div> {this.state.activeMarker.label}) Price: {this.state.activeMarker.price}</div>
                      <div>{this.state.activeMarker.acres} Acres</div>
                      <div>{this.state.activeMarker.price_per_acre} Per Acre</div>
            </InfoWindow> 
          </Map>
        </div>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB6X5chD5nt8ZU3KbYYd4fdHrmIMidUYMQ'
})(MapContainer)
