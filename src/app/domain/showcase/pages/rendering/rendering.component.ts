import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDocumentComponent } from '@domain/showcase/components/page-document/page-document.component';
import { iTemplateComponent } from '@domain/showcase/interfaces/index.interface';
import { componentMap } from '@domain/showcase/configs/component-map.configs';

@Component({
  selector: 'app-rendering',
  imports: [CommonModule, PageDocumentComponent],
  templateUrl: './rendering.component.html',
  styleUrl: './rendering.component.scss',
})
export class RenderingComponent implements OnInit {
  public templateRouterComponent: string = '';
  public templeted: iTemplateComponent[] = componentMap;

  public constructor(private router: ActivatedRoute) {}
  public ngOnInit(): void {
    this.router.url
      .subscribe(params => {
        this.templateRouterComponent = params[0].path;
      })
      .unsubscribe();
  }
}
