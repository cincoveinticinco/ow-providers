import { AbstractControl, ValidatorFn } from '@angular/forms';

export function onlyLettersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value as string;
        if (!/^[a-zA-Z\s]+$/.test(value)) return { 'only_letters': true };
        return null;
    };
}