import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/article.model';
import { WikiCategory } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { ArticleService } from '../shared/article.service';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article

  constructor(private CategoryService: CategoryService, private route: ActivatedRoute, private ArticleService: ArticleService) {

  }

  ngOnInit() {
    this.ArticleService.getAllArticles().subscribe(success => {
      if (success) {
        this.article = this.ArticleService.getArticleById(+this.route.snapshot.params['id'])
        console.log(this.article)
        this.article.articleItems.sort(function (a, b) {
          if (a.position < b.position) { return -1; }
          if (a.position > b.position) { return 1; }
          return 0
        });
        for (var articleItem of this.article.articleItems)
          articleItem.listContents.sort(function (a, b) {
            if (a.position < b.position) { return -1; }
            if (a.position > b.position) { return 1; }
            return 0
          });
      }
    })
  }

  public clickTicket() {
    window.location.href = 'https://iform.interpublic.com/';
  }

  /** Functions to check which component is in newArticle.articleContents */
  isTitleComponent(component): boolean {
    if (component.selector === "Title") {
      return true
    } else return false
  }

  isTextComponent(component): boolean {
    if (component.selector === "Text") {
      return true
    } else return false
  }

  isSubheaderComponent(component): boolean {
    if (component.selector === "Subheader") {
      return true
    } else return false
  }

  isBulletedListComponent(component): boolean {
    if (component.selector === "Bulleted List") {
      return true
    } else return false
  }

  isNumberedListComponent(component): boolean {
    if (component.selector === "Numbered List") {
      return true
    } else return false
  }

  isFullWidthImageComponent(component): boolean {
    if (component.selector === "Full-Width Image") {
      return true
    } else return false
  }
}
