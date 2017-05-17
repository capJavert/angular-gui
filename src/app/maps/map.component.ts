import { Component } from '@angular/core';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  // google maps zoom level
  zoom: number = 8;
  paths : Array<LatLngLiteral> = [
    { lat: 51.373858,  lng: 7.815982 },
    { lat: 51.673858,  lng: 7.215982 },
    { lat: 51.373858,  lng: 7.895982 }
    ];
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  click(event: any){
    console.log(`click event is called {event}`);
  }

  remove(event: any){
    console.log(`delete is called {event}`);
  }

  mapClicked(event: any) {
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, event: any) {
    console.log('dragEnd', m, event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
