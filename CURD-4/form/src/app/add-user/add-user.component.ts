import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_helpers/user.service';
import { Dboprations } from '../_helpers/Db-oprations';
import { MustMatch } from '../_helpers/must-match';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  buttonText: string = "Submit";
  dbops: Dboprations;
  userId: number;
  constructor(private _toastr: ToastrService, private _fb: FormBuilder, private _userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(parama => {
      this.userId = parama['userId']
    });
  }

  ngOnInit(): void {
    this.setFormState();

    if(this.userId && this.userId != null){
    this.getUserById(this.userId);
    }
  }
  setFormState() {
    this.buttonText = "Submit";
    this.dbops = Dboprations.create;
    this.registerForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email]) ),
      dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmpassword: new FormControl('', Validators.required),
      acceptTerms: new FormControl('', Validators.requiredTrue)
    },
      MustMatch('password', 'confirmpassword')
    );
  }

  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    switch (this.dbops) {
      case Dboprations.create:
        this._userService.addUser(this.registerForm.value).subscribe(res => {
          this._toastr.success("Added User !!", "User Registration")
          this.onCancel();
        });
        break;
      case Dboprations.update:
        this._userService.updateUser(this.registerForm.value).subscribe(res => {
          this._toastr.success("Updated User !!", "User Registration")
          this.onCancel();
        });
        break;
    }


  }

  onCancel() {
    this.registerForm.reset();
    this.buttonText = "Submit";
    this.dbops = Dboprations.create;
    this.submitted = false;
    this.router.navigate(['/list-user']);
  }

  getUserById(id: number) {
    this._userService.getUser(id).subscribe(res => {
      this.buttonText = "Update";
      this.dbops = Dboprations.update;


      this.registerForm.patchValue(res);
      this.registerForm.get('password').setValue('');
      this.registerForm.get('confirmpassword').setValue('');
      this.registerForm.get('acceptTerms').setValue(false);

    });
  }
}

