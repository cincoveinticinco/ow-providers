import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value as string;

        if (!/([A-Z|a-z|0-9|\-!#$%&'*+_](\.){0,1})+[A-Z|a-z|0-9|\-!#$%&'*+_]\@([A-Z|a-z|0-9|\-!#$%&'*+_])+((\.){0,1}[A-Z|a-z|0-9]){1}\.[a-zA-Z]{2,6}(\.[a-zA-Z]{2,6})?/.test(value)) return { 'email': true };

        return null;
    };
}