import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lettersAndNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value as string;
        if (!/^[a-zA-Z0-9]+$/.test(value)) return { 'letters_and_numbers': true };
        return null;
    };
}