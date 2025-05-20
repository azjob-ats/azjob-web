import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationTabTitleService {
    private title: Title = inject(Title);
    private translate: TranslateService = inject(TranslateService);
    private router: Router = inject(Router);
    private lang$: LanguageService = inject(LanguageService);

    public init(): void {
        this.translate.addLangs(['pt-BR', 'en-US', 'es-CO']);

        this.router.events
            .pipe(
                switchMap((router) =>
                    this.lang$.getLanguage().pipe(
                        tap((lang) => {
                            this.translate.setDefaultLang(lang.prefix);
                        }),
                        map(() => router)
                    )
                )
            )
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    const route = this.router.routerState.root;
                    let activeRoute = route;

                    while (activeRoute.firstChild) {
                        activeRoute = activeRoute.firstChild;
                    }

                    return activeRoute.snapshot.data['title'];
                }),
                switchMap((titleKey: string) => {
                    return this.translate.get(titleKey || 'azjob');
                })
            )
            .subscribe((translatedTitle) => {
                this.title.setTitle(translatedTitle);
            });
    }
}