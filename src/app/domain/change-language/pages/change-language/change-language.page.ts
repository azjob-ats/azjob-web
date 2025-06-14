import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '@domain/change-language/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageTranslatorService } from '@domain/change-language/services/language-translator.service';
import { Selection } from '@domain/change-language/interfaces/language.interface';
import { RouterModule } from '@angular/router';
import { LanguageApiMockservice } from '@domain/change-language/mocks/language.api.mock';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, RouterModule],
  providers: [LanguageApiMockservice, LanguageService, LanguageTranslatorService, TranslateService],
})
export class ChangeLanguagePage implements OnInit {
  public routes = environment.ROUTES;
  public num_folder: number = 2;
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

  public onSelectionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selected(value);
  }
}
