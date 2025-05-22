import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '@domain/change-language/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageTranslatorService } from '@domain/change-language/services/language-translator.service';
import { iSelection } from '@domain/change-language/interfaces/language.interface';
import { LanguageApiMockservice } from '@domain/change-language/mocks/language.api.mock';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-lang',
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, RouterModule],
  providers: [LanguageApiMockservice, LanguageService, LanguageTranslatorService, TranslateService],
  templateUrl: './select-lang.component.html',
  styleUrl: './select-lang.component.scss',
})
export class SelectLangComponent implements OnInit {
  public formControl = new FormControl('');
  public selectEmpy = '';
  public default = '';
  public selections: iSelection[] = [];
  private translationService: LanguageTranslatorService = inject(LanguageTranslatorService);
  private translate: TranslateService = inject(TranslateService);
  private lang: LanguageService = inject(LanguageService);

  public ngOnInit(): void {
    this.selectEmpy = this.translate.instant('AZJOB.TEST.OPTION_EMPY');
    this.default = this.translationService.getDefaultLang();

    this.formControl.setValue(this.default);
    this.lang.getAllLanguage().subscribe(res => {
      res.forEach(value => {
        this.selections.push({
          description: value.language,
          cod: value.prefix,
        });
      });
    });
  }

  public selected($event: string) {
    this.translationService.changeLang($event);
  }

  public onSelectionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selected(value);
  }
}
