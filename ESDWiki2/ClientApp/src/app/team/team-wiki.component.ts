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
        this.articleList = this.ArticleService.getTeamArticles()
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
    this.selectedCategoryArticleList = this.getTeamArticleByCategory(name)
  }

  public getTeamArticleByCategory(categoryName: string): Article[] {
    var TeamArticleList: Article[] = []
    for (let article of this.articleList) {
      for (let category of article.teamCategories) {
        if (category.categoryName === categoryName) {
          TeamArticleList.push(article)
        }
      }
    }
    return TeamArticleList
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

  public onSearchEnter(searchValue: string) {
    this.selectCategory("");
    if (searchValue === "") {
      this.CategoryService.getAllTeamCategories().subscribe(success => {
        if (success) {
          this.categoryList = this.CategoryService.teamCategories
        }
      })
      this.ArticleService.getAllArticles().subscribe(success => {
        if (success) {
          this.articleList = this.ArticleService.getTeamArticles()
        }
      })
    } else {
      this.CategoryService.getAllTeamCategories().subscribe(success => {
        if (success) {
          this.categoryList = this.CategoryService.teamCategories
        }
      })
      this.ArticleService.getAllArticles().subscribe(success => {
        if (success) {
          // Get only team articles
          this.articleList = this.ArticleService.getTeamArticles()
          // Create lists to push items into that match search value
          var newCategoryList: TeamCategory[] = []
          var newArticleList: Article[] = []

          // First we'll add categories that include the search value
          for (let category of this.categoryList) {
            if ((category.name.toLowerCase().includes(searchValue.toLowerCase())) && (!newCategoryList.includes(category))) {
              newCategoryList.push(category)
            }
          }

          // Second we'll add articles whose title contains the search value
          for (let article of this.articleList) {
            // If title or category containes search value
            if ((article.title.toLowerCase().includes(searchValue.toLowerCase())) || (article.teamCategories[0].categoryName.toLowerCase().includes(searchValue.toLowerCase()))) {
              newArticleList.push(article)
              // Loop through categories so we can add a missing category if needed
              for (let category of this.categoryList) {
                if ((category.name === article.teamCategories[0].categoryName) && (!newCategoryList.includes(category))) {
                  newCategoryList.push(category)
                  break;
                }
              }
            }
          }
          // Update articles and categories so only the matching items appear / Then sort them a-z
          this.articleList = newArticleList.sort(function (a, b) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0
          })
          this.categoryList = newCategoryList.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0
          })
        }
      })
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

