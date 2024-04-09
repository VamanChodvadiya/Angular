import { FormGroup } from "@angular/forms";
import { from } from "rxjs";

export function MustMatch( password : string , confirmpassword : string){
 return (formGroup:FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmpasswordControl = formGroup.controls[confirmpassword];

if (confirmpasswordControl.errors && !confirmpasswordControl.errors["mustMatch"]){
    return;
}




    if (passwordControl.value !== confirmpasswordControl.value){ 
        confirmpasswordControl.setErrors({MustMatch:true});
    }else{
        confirmpasswordControl.setErrors(null);
    } 


 }   
}