import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrongValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 5;

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSymbol && isLongEnough;

    return isValid
      ? null
      : {
          passwordWeak: {
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSymbol,
            isLongEnough,
          },
        };
  };
}
