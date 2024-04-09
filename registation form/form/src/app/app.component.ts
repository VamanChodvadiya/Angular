import { UserService } from './_helper/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { User } from './_helper/user.interface';
import { DBOperation } from './_helper/db-oprations';
import { MustMatch } from './_helper/must-match.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'form';
  registerForm: FormGroup;
  users: User[] = [];
  submitted: boolean = false;
  buttonText: string = "Submit";
  dbops: DBOperation;

  constructor(private toastrService: ToastrService, private _fb: FormBuilder, private _userservice: UserService) {

  }
  ngOnInit(): void {
    this.setFromState();
    this.getAllUsers();
  }

  setFromState() {
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;

    this.registerForm = this._fb.group({
      id: [0],
      title: ['', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dob: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmpassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    },{
      validators : MustMatch('password','confirmpassword')
    });
  }

  get f(){
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    switch (this.dbops) { 
      case DBOperation.create:
        this._userservice.addUser(this.registerForm.value).subscribe(res => {
          this.toastrService.success("user Added !!", " User Registration");
          this.getAllUsers();
          this.onCancel();
        });
        break;
      case DBOperation.update:
        this._userservice.updateUser(this.registerForm.value).subscribe(res => {
          this.toastrService.success("user Updated !!", " User Registration");
          this.getAllUsers();
          this.onCancel();
        });
        break;
    }
  }
  onCancel() {
    this.registerForm.reset();
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;
    this.submitted = false;
  }

  getAllUsers() {
    this._userservice.getUsers().subscribe((res: User[]) => {
      this.users = res;
    });
  }
  Edit(userId: Number) {
    this.buttonText = "Update";
    this.dbops = DBOperation.create;

    let user = this.users.find((u:User) => u.id === userId);
    this.registerForm.patchValue(user);

    this.registerForm.get('password').setValue('');
    this.registerForm.get('confirmpassword').setValue('');
    this.registerForm.get('acceptTerms').setValue(false);

  }
  Delete(userId: Number) {
    // this._userservice.deleteUser(userId).subscribe(res => {
    //   this.getAllUsers();
    //   this.toastrService.success("Deleted Success !!", "User Registration");
    // });
    Swal.fire({
      title: 'Are You Sure?',
      text: 'You Wil Not Be able to recover deleted this record',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,delet it',
      cancelButtonText: 'No,Keep it',

    }).then((result) => {
      if (result.value) {
        this._userservice.deleteUser(userId).subscribe(res => {
          this.getAllUsers();
          this.toastrService.success("Deleted Success !!", "User Registration");
        });
        Swal.fire(
          'Deleted!',
          'Your Record has been  deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    })

  }
}
