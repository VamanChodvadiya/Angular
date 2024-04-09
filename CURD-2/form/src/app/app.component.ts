import { Component, OnInit, ViewChild, viewChild, viewChildren } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
// import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserService } from './common/user.service';
import { subscribe } from 'diagnostics_channel';
import { User } from './common/user.interface';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DBopration } from './common/db-opration';
import { MustMatch } from './common/MustMatch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'form';
  addForm: FormGroup;
  submitted: boolean = false;
  users: User[] = [];
  buttonTxT: string;
  dbops: DBopration;

  @ViewChild('nav') elfile: any;


  constructor(private _userService: UserService, private _toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.setFormState();
    this.getUsers();
  }

  setFormState() {
    this.buttonTxT = "save";
    this.dbops = DBopration.add;


    this.addForm = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12] [0-9]|3 [01])$/)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmpassword: new FormControl('', Validators.compose([Validators.required])),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    },
    MustMatch('password','confirmpassword')
    );
  }
  get ctrl() {
    return this.addForm.controls;
  }
  register() {
    this.submitted = true;
    console.log(this.addForm.value);
    if (this.addForm.invalid) {
      return;
    }

    switch (this.dbops) {
      case DBopration.add:
        this._userService.addUser(this.addForm.value).subscribe(res => {
          this._toastr.success("User Added", "User Registration !!!");
          this.getUsers();
          this.resetForm();
          this.elfile.select('viewtab');
        });
        break;
      case DBopration.update:
        this._userService.updateUser(this.addForm.value).subscribe(res => {
          this._toastr.success("User Updated", "User Registration !!!");
          this.getUsers();
          this.resetForm();
          this.elfile.select('viewtab');


        });
        break;
    }
  }

  resetForm() {
    this.submitted = false;
    this.addForm.reset();
  }

  tabchange() {
    this.resetForm();
    this.buttonTxT = "save";
  }

  getUsers() {
    this._userService.getAllUsers().subscribe((res: User[]) => {

      this.users = res;
    });


  }
  edit(Id: number) {
    this.buttonTxT = "update";
    this.dbops = DBopration.update;

    let user = this.users.find((u: User) => u.id === Id);
    this.addForm.patchValue(user);

    this.addForm.get('password').setValue('');
    this.addForm.get('acceptTerms').setValue(false);
    this.elfile.select('addtab');
  }
  delete(Id: number) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(Id).subscribe(res => {
          this._toastr.success("Deleted Success", "User registation !!!");
          this.getUsers();
        });
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });

  }
}
