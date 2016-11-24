import { Injectable }     from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import { Event }           from './event';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class EventService {
  private eventsUrl = 'http://rsc-harambe.azurewebsites.net/api';  // URL to web API
  constructor (private http: Http) {}

  getEvents (): Observable<Event[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.eventsUrl+'/events', params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getEvent(id: number): any {
    return this.getEvents().subscribe(
      events => events.find(event => event.id === id)
    );
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
