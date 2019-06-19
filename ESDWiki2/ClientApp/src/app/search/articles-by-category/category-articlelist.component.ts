import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CategoryService } from '../../shared/category.service'
import { WikiCategory } from '../../shared/category.model'
import { ArticleService } from '../../shared/article.service'
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/article.model';

@Component({
  templateUrl: './category-articlelist.component.html',
  styleUrls: ['./category-articlelist.component.css']
})
export class CategoryListComponent implements OnInit {
  isRequesting: boolean = false
  category: WikiCategory
  categoryArticleList: Article[]
  selectedArticle: Article

  constructor(private CategoryService: CategoryService, private route: ActivatedRoute, private ArticleService: ArticleService) {

  }

  ngOnInit() {
    //Refresh list of categories
    this.CategoryService.getAllWikiCategories().subscribe(success => {
      if (success) {
        //Pull wanted category
        this.category = this.CategoryService.getWikiCategory(String(this.route.snapshot.params['name']))
        //Refresh list of all articles
        this.ArticleService.getAllArticles().subscribe(success => {
          if (success) {
            //Pull list of articles by category
            this.categoryArticleList = this.ArticleService.getWikiArticleByCategory(this.category.name)
            this.selectArticle(this.categoryArticleList[0].id)
          }
        })
      }
    })
  }

  public selectArticle(id: number) {
    this.selectedArticle = this.categoryArticleList.find(a => a.id === id)
    this.selectedArticle.articleItems.sort(function (a, b) {
      if (a.position < b.position) { return -1; }
      if (a.position > b.position) { return 1; }
      return 0
    });
    for (var articleItem of this.selectedArticle.articleItems)
      articleItem.listContents.sort(function (a, b) {
        if (a.position < b.position) { return -1; }
        if (a.position > b.position) { return 1; }
        return 0
      });
  }

  public isSelectedArticle(id: number): boolean {
    if ((this.selectedArticle !== undefined) && (id !== undefined)) {
      if (this.selectedArticle.id === id) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
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
