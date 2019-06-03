import { Component, OnInit } from '@angular/core'
import { ArticleService } from '../shared/article.service'
import { Article } from '../shared/article.model';
import { UserService } from '../shared/services/user.service';
import { WikiCategory, TeamCategory } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'team-wiki',
  templateUrl: './team-wiki.component.html',
  styleUrls: ['./team-wiki.component.css']
})
export class TeamWikiComponent implements OnInit {
  categoryList: TeamCategory[]
  articleList: Article[]
  selectedCategoryArticleList: Article[]
  selectedArticle: Article
  selectedCategory: TeamCategory
  

  constructor(private ArticleService: ArticleService, private CategoryService: CategoryService, private userService: UserService) { }

  ngOnInit(): void {
    this.CategoryService.getAllTeamCategories().subscribe(success => {
      if (success) {
        this.categoryList = this.CategoryService.teamCategories
      }
    })
    this.ArticleService.getAllArticles().subscribe(success => {
      if (success) {
        this.articleList = this.ArticleService.articleList
      }
    })
    // Need to set our Role subscriptions in case of page reload without re-login
    this.userService.isWikiAdmin();
    this.userService.isWikiUser();
    this.userService.isESDTeamAdmin();
    this.userService.isESDTeamMember();
  }

  public selectArticle(id: number) {
    this.selectedArticle = this.articleList.find(a => a.id === id)
  }

  public selectCategory(name: string) {
    this.selectedCategory = this.CategoryService.getTeamCategory(name)
    this.selectedCategoryArticleList = this.ArticleService.getTeamArticleByCategory(name)
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

  public isSelectedCategory(categoryName: string): boolean {
    if ((this.selectedCategory !== undefined) && (categoryName !== undefined)) {
      if (this.selectedCategory.name === categoryName) {
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

