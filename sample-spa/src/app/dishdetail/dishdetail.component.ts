import { Component, OnInit, Input } from '@angular/core';
import { Dish } from  '../shared/dish'

import { Params, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { DishService } from '../services/dish.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import {MdSliderModule} from '@angular/material';

import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  constructor(private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder ) { 
      this.createForm();
    }

  //@Input()
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  comment: Comment;
  active = true;
  comments: Comment[];
  
  commentsForm: FormGroup;

  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMassages = {
    'author': {
      'required': 'Author is required',
      'minlength': 'First Name must be at least 2 characters',
      'maxlength': 'First Name must be not more than 25 characters'
    },
    'comment': {
      'required': 'Last Name is required',
      'minlength': 'Last Name must be at least 2 characters',
      'maxlength': 'Last Name must be not more than 25 characters'
    }  
  }

  ngOnInit() {
    //let id = +this.route.snapshot.params['id'];

    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds );

    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(dish => { 
        this.dish = dish;
        this.setPrevNext(dish.id);  
        this.comment = null;
        this.reset();
      });
  }

  createForm() {
    this.commentsForm= this.fb.group({
      author: ['', [ Validators.required, Validators.minLength(2) ]],
      comment: ['', [ Validators.required ]],
      rating: 5
    });

    this.commentsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

     this.onValueChanged(); //reset validation messages
  };


  onValueChanged(data?: any) {
    if (!this.commentsForm) {
      return;
    };

    const form = this.commentsForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMassages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      };

      if (form.valid) {
        this.comment = this.commentsForm.value;
      } else {
        this.comment = null;
      }
    }

  };
   
  setPrevNext(dishId: number)  {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  reset(): void {
    this.commentsForm.reset({
      author: '',
      comment: '',
      rating: 5
    });

    this.active = false;
    setTimeout(() => this.active = true, 0);  
  };

  onSubmit() {
    this.comment = this.commentsForm.value;
    this.reset();
  };
}
