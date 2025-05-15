import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: '<router-outlet></router-outlet> <a href="/showcase/InputPrimaryComponent">showcase</a>',
})
export class AppComponent implements OnInit {
  public ngOnInit(): void { }
}
