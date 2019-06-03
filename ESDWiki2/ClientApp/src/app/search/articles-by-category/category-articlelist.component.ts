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
            this.selectedArticle = this.categoryArticleList[0]
          }
        })
      }
    })
  }

  public selectArticle(id: number) {
    this.selectedArticle = this.categoryArticleList.find(a => a.id === id)
  }

  public isSelectedArticle(title: string): boolean {
    if ((this.selectedArticle !== undefined) && (title !== undefined)) {
      if (this.selectedArticle.title === title) {
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
