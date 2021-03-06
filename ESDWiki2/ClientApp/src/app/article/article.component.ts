import { Component, OnInit, Inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from '../shared/article.service';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article

  constructor(private route: ActivatedRoute, private ArticleService: ArticleService) {

  }

  ngOnInit() {
    this.ArticleService.getArticleById(+this.route.snapshot.params['id']).subscribe(success => {
      if (success) {
        this.article = this.ArticleService.articleById
      }
    })
  }

  public clickTicket() {
    (window as any).open('http://iform.interpublic.com/', "_blank");
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
