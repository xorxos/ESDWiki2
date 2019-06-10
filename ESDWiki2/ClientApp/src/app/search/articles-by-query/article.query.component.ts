import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'article-query-component',
  templateUrl: './article.query.component.html',
  styleUrls: ['./article.query.component.css']
})
export class ArticleQueryComponent implements OnInit {
  articleList: Article[]
  query: string
  params: any;
  constructor(private ArticleService: ArticleService, private CategoryService: CategoryService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.query = params['searchQuery']
      this.articleList = this.ArticleService.getWikiArticleBySearch(this.query)
    })
  }

  public clickCategory(categoryName: string) {
    let category = this.CategoryService.getWikiCategoryByName(categoryName)
    this.router.navigate(['/browse/', category.categoryUrl])
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
