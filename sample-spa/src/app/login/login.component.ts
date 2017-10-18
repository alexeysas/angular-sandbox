import { Component, OnInit } from '@angular/core';

import {MdDialog, MdDialogRef } from '@angular/material' 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialogRef: MdDialogRef<LoginComponent>) { }

  user = {
    remember: false,
    username: '',
    password: ''
  };

  ngOnInit() {
  }

  onSubmit() {
    console.log("User: ", this.user);
    this.dialogRef.close();
  }

}
