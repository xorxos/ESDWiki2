import { Component, OnInit } from '@angular/core'
import { Article } from '../shared/article.model';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'article-details-component',
  templateUrl: './article.details.component.html',
  styleUrls: ['./article.details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  article: Article
  constructor(private ArticleService: ArticleService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.ArticleService.getAllArticles().subscribe(success => {
      if (success) {
        this.article = this.ArticleService.getArticleById(+this.route.snapshot.params['id'])
        console.log(this.article)
      }
    })
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
