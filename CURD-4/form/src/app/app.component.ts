import { APP_BASE_HREF } from '@angular/common';
import { UserService } from './_helpers/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from './_helpers/user.interface';
import Swal from 'sweetalert2';
import { Dboprations } from './_helpers/Db-oprations';
import { MustMatch } from './_helpers/must-match';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'RegistrationApp';
  constructor() {

  }
  ngOnInit(): void {

  }
}