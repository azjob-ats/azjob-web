import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { iTemplateComponent } from '@domain/showcase/interfaces/index.interface';
import { InputPrimaryComponent } from '@widget/components/input-primary/input-primary.component';
import { TemplateComponent } from '../templates/template.component';
import { templete } from '@domain/showcase/pages/rendering/template';

@Component({
  selector: 'app-rendering',
  imports: [CommonModule, TemplateComponent],
  templateUrl: './rendering.component.html',
  styleUrl: './rendering.component.scss'
})
export class RenderingComponent implements OnInit {

  public templateRouterComponent: string = '';


  public templeted: iTemplateComponent[] = templete

  constructor(private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.router.url.subscribe(params => {
      this.templateRouterComponent = params[0].path;
    }).unsubscribe()
  }
}
