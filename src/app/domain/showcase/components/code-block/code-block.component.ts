import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
declare var Prism: any;
declare var prettier: any;
declare var prettierPlugins: any;

@Component({
  selector: 'app-code-block',
  imports: [CommonModule],
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent implements OnChanges {
  @Input() public componentCode: string = '';
  @Input() public language: string = '';
  protected formattedCode: string = '';
  protected copyLabel: string = 'Copy';
  protected isCopied: boolean = false;

  public constructor(
    private el: ElementRef
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['componentCode'] || changes['language']) {
      this.formatCode();
    }
  }

  private async formatCode() {
    try {
      let parser = 'html';
      if (this.language === 'html') parser = 'html';
      if (this.language === 'css') parser = 'css';
      if (this.language === 'javascript') parser = 'babel';
      this.formattedCode = this.componentCode;

      this.formattedCode = await prettier.format(this.componentCode, {
        parser,
        plugins: prettierPlugins,
        tabWidth: 2,
        singleQuote: true,
        semi: true,
      });

      setTimeout(() => {
        Prism.highlightAllUnder(this.el.nativeElement);
      }, 0);
    } catch (error) {
      console.error('Error formatting code:', error);
      this.formattedCode = `/Error`;
    }
  }

  public copyCode(): void {
    navigator.clipboard.writeText(this.formattedCode).then(() => {
      this.isCopied = true;
      this.copyLabel = 'Copied!';

      setTimeout(() => {
        this.isCopied = false;
        this.copyLabel = 'Copy';
      }, 1500);
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  }
}
