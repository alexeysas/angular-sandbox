import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {Feedback, ContactType} from '../shared/feedback'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  active = true;
  formErrors = {
    
  };

  constructor(private fb: FormBuilder) { 
    this.createForm();   
  }

  ngOnInit() {
  }
  
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      lastname: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      telnum: ['0', [ Validators.required, Validators.pattern ]],
      email: ['', Validators.required, Validators.email ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //reset validation messages
  };

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '0',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.active = false;
    setTimeout(() => this.active = true, 0);
  };

  onValueChanged(data=null) {

  };
}
