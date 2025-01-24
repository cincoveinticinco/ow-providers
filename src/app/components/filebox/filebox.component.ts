import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { DragAndDropFileDirective } from '../../shared/directives/drag-and-drop-file.directive';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-filebox',
  standalone: true,
  imports: [DragAndDropFileDirective, DialogComponent],
  templateUrl: './filebox.component.html',
  styleUrl: './filebox.component.scss'
})
export class FileboxComponent implements ControlValueAccessor, Validator, OnInit {

  @Input() allowedExtensions: string[] = [];

  onChange = (value: string) => {}
  onTouched = () => {}

  control: FormControl = new FormControl('');
  value: any;
  disabled: boolean = false;
  fileName: any;
  view: string = '';
  allowedExtensionsString: string = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if(this.ngControl != null){
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (!this.allowedExtensions?.length) this.allowedExtensions = ['pdf', 'PDF', 'jpeg', 'jpg', 'png'];
    this.allowedExtensionsString = this.allowedExtensions.map(ext => `.${ext}`).join(', ');
  }

  onFileChange(event: Event){
    const target = event.target as HTMLInputElement;
    const files = target.files
    if(files && files.length > 0){
      const file = files[0];
      this.control.setValue(file);

      this.value = { file, name: file.name, url: null};
      this.onChange(this.value)
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null
  }

  onDragFileChange(files: any){
    if(files && files.length > 0){
      const file = files[0];
      this.control.setValue(file);

      this.value = { file, name: file.name, url: null};
      this.onChange(this.value)
    }
  }

  clearFile(){
    this.control.setValue(null);
    this.value = null;
    this.onChange(this.value)
  }

  writeValue(value: any): void {
    this.value = value
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  changeView(newView: string = '') {
    this.view = newView;
  }
}
