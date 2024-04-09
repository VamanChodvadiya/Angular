import { AbstractControl, ValidationErrors, Validator, ValidatorFn, Validators } from "@angular/forms";


export function MustMatch(password: string, confirmpassword: string): ValidatorFn {
    return (ctrl: AbstractControl): ValidationErrors | null => {
        const passwordctrl = ctrl.get(password);
        const confirmpasswordctrl = ctrl.get(confirmpassword);


        if (confirmpasswordctrl.errors && !confirmpasswordctrl.errors['mustMatch']) {
            return null;
        }


        if (passwordctrl.value !== confirmpasswordctrl.value) {
            confirmpasswordctrl.setErrors({ mustMatch: true });

        } else {
            confirmpasswordctrl.setErrors(null);

        }

        return null;

    }
}