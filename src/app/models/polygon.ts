import {LatLngLiteral} from "@agm/core";

export class Polygon {
  id: number = null;
  polygon: Array<LatLngLiteral> = [];
  color: string = "green";
}
