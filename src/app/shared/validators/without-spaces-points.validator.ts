import { AbstractControl, ValidatorFn } from '@angular/forms';

export function withoutSpacesPoints(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value as string;
        if (!/^[^. ]+$/.test(value)) return { 'without_spaces_points': true };
        return null;
    };
}