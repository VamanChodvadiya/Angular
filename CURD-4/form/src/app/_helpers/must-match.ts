import { AbstractControl,ValidationErrors,ValidatorFn } from "@angular/forms";

export function MustMatch(password: string, confirmpassword: string ): ValidatorFn{
    return(ctrl : AbstractControl) : ValidationErrors |null=> {
        const passwordControl   = ctrl.get(password);
        const confirmpasswordControl   = ctrl.get(confirmpassword);

if(confirmpasswordControl.errors && !confirmpasswordControl.errors['mustMatch']){
    return null;
}


        if(passwordControl.value !== confirmpasswordControl.value){
            confirmpasswordControl.setErrors({mustMatch : true});
        }else{
            confirmpasswordControl.setErrors(null);
        }
    return null;    
    }
} 