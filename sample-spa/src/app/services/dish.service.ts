import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish'

import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'

import { BaseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service'

@Injectable()
export class DishService {

  constructor(private http: Http, 
   private processHTTPMsgService: ProcessHTTPMsgService ) { }

  getDishes(): Observable<Dish[]> {
    //return Observable.of(DISHES).delay(2000).toPromise();
    //return Observable.of(DISHES).delay(2000);
    return this.http.get(BaseURL + 'dishes')
      .map(res => { return this.processHTTPMsgService.extractData(res) })
      .catch(error => {return this.processHTTPMsgService.handleError(error)});
  }

  getDish(id: number): Observable<Dish> {
    //return Observable.of(DISHES.filter((dish) => dish.id === id)[0]).delay(2000);
    return this.http.get(BaseURL + 'dishes/' + id)
      .map(res => { return this.processHTTPMsgService.extractData(res) })
      .catch(error => {return this.processHTTPMsgService.handleError(error)});
  }

  getFeaturedDish(): Observable<Dish> {
    //return Observable.of(DISHES.filter((dish) => dish.featured === true)[0]).delay(2000);
    return this.http.get(BaseURL + 'dishes?featured=true')
      .map(res => { return this.processHTTPMsgService.extractData(res)[0] })
      .catch(error => {return this.processHTTPMsgService.handleError(error)});
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id)})
      .catch(error => { return this.processHTTPMsgService.handleError(error)} ); 
  }
}
