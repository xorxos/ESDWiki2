import { Component, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'article-app',
  encapsulation: ViewEncapsulation.None,
  template: `
      <top-navbar></top-navbar>
      <router-outlet></router-outlet>
      `
})
export class ArticleAppComponent {

}
