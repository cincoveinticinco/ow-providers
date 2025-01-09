import { AbstractControl, ValidatorFn } from '@angular/forms';

export function onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value as string;
        if (!/^\d+$/.test(value)) return { 'only_numbers': true };
        return null;
    };
}