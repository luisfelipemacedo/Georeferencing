import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  // The line below say that we are going to receive a value, its name and type
  static values = { apiKey: String, markers: Array}
  connect() {
    mapboxgl.accessToken = this.apiKeyValue;
    this.map = new mapboxgl.Map({ // this.map is an instance variable
      container: this.element, // container ID, name of the elemnt connected with js controller
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      });

      this.#addmarkersToMap()
      this.#fitMapToMarkers()
  }

  // In order to create a private method in JS we use #
  #addmarkersToMap() {
    // Create a new marker.
    this.markersValue.forEach((marker) => {

       new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .addTo(this.map);
    });
  }

  #fitMapToMarkers() {
    // Create a 'LngLatBounds' with both corners at the first coordinate.
    const bounds = new mapboxgl.LngLatBounds()

    // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
    this.markersValue.forEach((marker) => {
      bounds.extend([marker.lng, marker.lat]);
    })
    this.map.fitBounds(bounds, {});
  }
}
