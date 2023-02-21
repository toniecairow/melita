import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(control?.value).toLowerCase())
      ? null
      : { emailValidator: { value: control.value } };
  };
}
