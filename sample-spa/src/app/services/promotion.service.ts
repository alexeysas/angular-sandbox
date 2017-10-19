import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion'
//import { PROMOTIONS } from '../shared/promotions'


import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay'
import 'rxjs/add/observable/of'

import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class PromotionService {

  constructor( private restangular: Restangular) {   }

  getPromotions(): Observable<Promotion[]> {
    //return new Promise(resolve => {
    //  setTimeout(() => resolve(PROMOTIONS), 2000);
    //});

    //return Observable.of(PROMOTIONS).delay(2000);
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    //return new Promise(resolve => {
    //  setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.id === id)[0]), 2000);
    //});

    //return Observable.of(PROMOTIONS.filter((promotion) => promotion.id === id)[0]).delay(2000);
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    //return new Promise(resolve => {
    //  setTimeout(() => resolve(PROMOTIONS.filter((promotion) =>promotion.featured === true)[0]), 2000);
    //});

    //return Observable.of(PROMOTIONS.filter((promotion) =>promotion.featured === true)[0]).delay(2000);
    return this.restangular.all('promotions')
      .getList({ featured: true })
      .map(promotions => promotions[0]);
  }

}
