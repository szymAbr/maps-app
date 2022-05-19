import React from "react";
import H from "@here/maps-api-for-javascript";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    // the reference to the container
    this.ref = React.createRef();
    // reference to the map
    this.map = null;
  }

  componentDidMount() {
    if (!this.map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: "{YOUR_API_KEY}",
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(this.ref.current, layers.vector.normal.map, {
        pixelRatio: window.devicePixelRatio,
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });
      this.map = map;
    }
  }

  render() {
    return <div style={{ width: "300px", height: "300px" }} ref={this.ref} />;
  }
}

/////////////////////////////////////////////////////

// /**
//  * Moves the map to display over Berlin
//  *
//  * @param  {H.Map} map      A HERE Map instance within the application
//  */
// function moveMapToBerlin(map) {
//   map.setCenter({ lat: 52.5159, lng: 13.3777 });
//   map.setZoom(14);
// }

// /**
//  * Boilerplate map initialization code starts below:
//  */

// //Step 1: initialize communication with the platform
// // In your own code, replace variable window.apikey with your own apikey
// var platform = new H.service.Platform({
//   apikey: window.apikey,
// });
// var defaultLayers = platform.createDefaultLayers();

// //Step 2: initialize a map - this map is centered over Europe
// var map = new H.Map(
//   document.getElementById("map"),
//   defaultLayers.vector.normal.map,
//   {
//     center: { lat: 50, lng: 5 },
//     zoom: 4,
//     pixelRatio: window.devicePixelRatio || 1,
//   }
// );
// // add a resize listener to make sure that the map occupies the whole container
// window.addEventListener("resize", () => map.getViewPort().resize());

// //Step 3: make the map interactive
// // MapEvents enables the event system
// // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
// var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// // Create the default UI components
// var ui = H.ui.UI.createDefault(map, defaultLayers);

// // Now use the map as required...
// window.onload = function () {
//   moveMapToBerlin(map);
// };
