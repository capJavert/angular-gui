import {ApplicationRef, Component} from '@angular/core';
import {PointService} from "../services/point.service";
import {PolygonService} from "../services/polygon.service";
import {Polygon} from "../models/polygon";
import {Point} from "../models/point";
import {user} from "../session";
import {AuthenticationService} from "../services/authentication.service";
declare let $:any;
const ICON_SIZE = 40;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  zoom: number = 9;
  areas : Array<Polygon> = [];
  markers: Point[] = [];
  lat: number = 51.673858;
  lng: number = 7.815982;
  isToolActive = false;
  activeTool: string = null;
  customTool: string = null;
  customClassName: string = null;
  mapStyle: any = [{"elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#023e58"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#283d6a"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#023e58"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3C7680"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#304a7d"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.arterial","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2c6675"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#255763"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#023e58"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#283d6a"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#3a4762"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}];
  areaColor: string = "green";
  errorMessage: string;

  constructor(private application: ApplicationRef,
              private pointService: PointService,
              private polygonService: PolygonService,
              private authService: AuthenticationService) {

    if(!user.token) {
      this.authService.handshake()
        .subscribe(auth => {
          user.authenticate(auth);
          this.polygonService.headers.append('Authorization', user.token);
          this.pointService.headers.append('Authorization', user.token);
          this.getMapData();
        });
    } else {
      this.getMapData();
    }
  }

  private getMapData() {
    //get markers
    this.pointService.list().subscribe(
      list => this.markers = list,
      error =>  this.errorMessage = <any>error
    );

    //get areas
    this.polygonService.list().subscribe(
      list => this.areas = list,
      error =>  this.errorMessage = <any>error
    );
  }

  clickedMarker(marker: Point) {
    if(this.customTool == "DELETE") {
      let index = this.markers.indexOf(marker);
      this.markers.splice(index, 1);
      this.pointService.remove(marker.id);
    }
  }

  clickedPaths(area: Polygon){
    if(this.customTool == "DELETE") {
      let index = this.areas.indexOf(area);
      this.areas.splice(index, 1);
      this.polygonService.remove(area.id);
    }
  }

  mapClicked(event: any) {
    if(this.isToolActive) {
      switch (this.customTool) {
        case "DELETE":
          break;
        case "AREA":
          let polygon = new Polygon();

          polygon.polygon = [
            {lat: event.coords.lat, lng: event.coords.lng},
            {lat: event.coords.lat+0.1, lng: event.coords.lng+0.1},
            {lat: event.coords.lat+0.1, lng: event.coords.lng-0.1}
          ];
          polygon.color = this.areaColor;

          this.areas.push(polygon);
          this.polygonService.create(polygon);
          break;
        default:
          let canvas = document.createElement("canvas");
          canvas.width = ICON_SIZE;
          canvas.height = ICON_SIZE;
          let ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.font = ICON_SIZE + "px FontAwesome";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(this.activeTool, ICON_SIZE/2, ICON_SIZE/2);

          let marker = new Point();

          marker.lat = event.coords.lat;
          marker.lng = event.coords.lng;
          marker.label = canvas.toDataURL('image/png');

          this.markers.push(marker);
          this.pointService.create(marker);

      }
    }
  }

  markerDragEnd(marker: Point, event: any) {
    this.pointService.update(marker);
  }

  polygonDragEnd(area: Polygon, event: any) {
    this.polygonService.update(area);
  }

  onToolPick(unicode, className, custom = null): void {
    this.customTool = custom;
    this.activeTool = unicode;
    this.isToolActive = true;
    this.customClassName = className;
  }

  onColorPick(color): void {
    this.areaColor = color;
  }

  onResetTool(): void {
    if(this.isToolActive) {
      this.activeTool = null;
      this.isToolActive = false;
      this.customTool = null;
      this.customClassName = null;
      this.application.tick();
    }
  }

  toggleFAB(toggle): void {
    toggle ? $('.fixed-action-btn').openFAB() : $('.fixed-action-btn').closeFAB();
  }
}
