import { Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '@domain/change-language/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageTranslatorService } from '@domain/change-language/services/language-translator.service';
import { Selection } from '@domain/change-language/interfaces/language.interface';
import { LanguageApiMockservice } from '@domain/change-language/mocks/language.api.mock';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-language-select',
  imports: [FormsModule, SelectModule,
    CommonModule, TranslateModule, ReactiveFormsModule, RouterModule],
  providers: [LanguageApiMockservice, LanguageService, LanguageTranslatorService, TranslateService],
  templateUrl: './language-select.component.html',
  styleUrl: './language-select.component.scss'
})
export class LanguageSelectComponent implements OnInit {
  public formControl = new FormControl('');
  public selectEmpy = '';
  public default = '';
  public selections: Selection[] = [];
  private translationService: LanguageTranslatorService = inject(LanguageTranslatorService);
  private translate: TranslateService = inject(TranslateService);
  private lang: LanguageService = inject(LanguageService);

  public ngOnInit(): void {
    this.selectEmpy = this.translate.instant('app.optionEmpy');
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

  public onSelectionChange(event: any) {
    this.selected(event.value);
  }
}
