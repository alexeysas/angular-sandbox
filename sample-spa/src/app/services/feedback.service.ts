import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { BaseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service'
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Feedback } from '../shared/feedback'

@Injectable()
export class FeedbackService {

  constructor( private restangular: Restangular ) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.restangular.all('feedback').post(feedback);
  }

}
