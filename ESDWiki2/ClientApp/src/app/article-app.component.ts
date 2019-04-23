import { Component } from '@angular/core'

@Component({
    selector: 'article-app',
    template: `
      <top-navbar></top-navbar>
      <router-outlet></router-outlet>
      `
})
export class ArticleAppComponent {

}
