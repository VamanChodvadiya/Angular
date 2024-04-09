import { UserApi, } from './helpers/user-api.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Action } from './helpers/action.enum';
import { Action } from './helpers/action.enum';
import { MustMatch } from './helpers/must-match.oprators';
import { User } from './helpers/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'User Registration';
  addForm: FormGroup;
  submitted: boolean = false;
  buttonText: string = "";
  FormTitle: string = "";
  dbops: Action;

  @ViewChild('content') elcotent: any;
  modalRef: any;

  userData: User[] = [];

  constructor(private _toastr: ToastrService, private modalService: NgbModal, private _userApi: UserApi) {

  }

  ngOnInit(): void {

    this.setFormState();
    this.getAllUsers();
  }
  setFormState() {

    this.buttonText = "save";
    this.FormTitle = "Add User";
    this.dbops = Action.create;
    

    this.addForm = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmpassword: new FormControl('', Validators.required),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    },
      MustMatch('password', 'confirmpassword'));
  }

  openXl(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { size: 'xl' });
  }
  cancelForm() {
    this.buttonText = "save";
    this.FormTitle = "Add User";
    this.dbops = Action.create;
    this.addForm.reset({
      id: 0,
      title: '',
      firstname: '',
      lastname: '',
      dob: '',
      email: '',
      password: '',
      confirmpassword: '',
      acceptTerms: false

    });
    this.modalRef.close();

  }
  get ctrl() {
    return this.addForm.controls
  }


  edit(userId: number) {
    this.buttonText = "update";
    this.FormTitle = "Update User";
    this.dbops = Action.update;
    this.modalRef = this.modalService.open(this.elcotent, { size: 'xl' });

    let user = this.userData.find((u: User) => u.id === userId);

    this.addForm.patchValue(user);
    this.addForm.get('password').setValue('');
    this.addForm.get('confirmpassword').setValue('');
    this.addForm.get('acceptTerms').setValue(false);

  }

  getAllUsers() {
    this._userApi.getUsers().subscribe((res: User[]) => {
      this.userData = res;
    });

  }
  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this record!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, Keep it!'
    }).then((result) => {
      if (result.isConfirmed) {
        //code here to delete record

        this._userApi.deleteUser(id).subscribe(res => {
          // this.userData = res;
          this.getAllUsers();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted. ',
            'success'
          )
        }
        );

      } else {
        Swal.fire(
          'Cancel!',
          'Your record is safe',
          'error'
        )
      }
    })
  }
  addUser() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }
  

    switch (this.dbops) {
      case Action.create:
        //code here to save data in database
        this._userApi.addUser(this.addForm.value).subscribe(res => {
          this._toastr.success("User Added", "Usere Registration ");
          this.getAllUsers(); 
          this.cancelForm();
          
        })

        break;
      case Action.update:
        //code here to update data in database
        this._userApi.updateUser(this.addForm.value).subscribe(res => {
          this._toastr.success("User Updated", "Usere Registration ");
          this.getAllUsers(); 
          this.cancelForm();
          
        })
        break;

    
  }
}

}