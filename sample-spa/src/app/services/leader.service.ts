import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader'
import { LEADERS } from '../shared/leaders'


import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay'
import 'rxjs/add/observable/of'

import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class LeaderService {

  constructor( private restangular: Restangular ) { }
  
  
  getLeaders(): Observable<Leader[]> {
    //return Observable.of(LEADERS).delay(2000);
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    //return Observable.of(LEADERS.filter((Leader) => Leader.id === id)[0]).delay(2000);
    return this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    //return Observable.of(LEADERS.filter((Leader) => Leader.featured === true)[0]).delay(2000);
    return this.restangular.all('leaders')
      .getList({ featured: true })
      .map(leaders => leaders[0]);
  }
}
