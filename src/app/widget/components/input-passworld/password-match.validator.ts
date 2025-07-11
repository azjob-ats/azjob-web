import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

export function passwordMatchValidator(
    compareWith: AbstractControl
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // Ignora se um dos dois estiver vazio
        if (!control.value || !compareWith.value) {
            return null;
        }

        return control.value === compareWith.value
            ? null
            : { passwordMismatch: true };
    };
}