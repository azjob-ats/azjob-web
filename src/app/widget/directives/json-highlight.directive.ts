import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appJsonHighlight]',
})
export class JsonHighlightDirective implements OnChanges {
  @Input() public jsonData: unknown;

  public constructor(private el: ElementRef) {}

  public ngOnChanges(): void {
    this.highlightJson();
  }

  private highlightJson(): void {
    if (!this.jsonData) return;
    const jsonString = JSON.stringify(this.jsonData, null, 2);
    const formattedJson = this.syntaxHighlight(jsonString);
    this.el.nativeElement.innerHTML = formattedJson;
  }

  private syntaxHighlight(json: string): string {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return json.replace(
      /("[^"]+"\s*:) | ("[^"]+") | (\b(true|false|null)\b) | (-?\d+(\.\d+)?)/g,
      match => {
        let cls = 'number';

        if (/^"[^"]+":$/.test(match.trim())) {
          cls = 'key';
        } else if (/^".*"$/.test(match)) {
          cls = 'string';
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }

        return `<span class="${cls}">${match}</span>`;
      }
    );
  }
}
