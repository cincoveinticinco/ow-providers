import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlSanitize',
  standalone: true
})
export class HtmlSanitizePipe implements PipeTransform {

  constructor(private dS: DomSanitizer) { }

  transform(value: string): SafeHtml {
    return this.dS.bypassSecurityTrustHtml(value);
  }

}
