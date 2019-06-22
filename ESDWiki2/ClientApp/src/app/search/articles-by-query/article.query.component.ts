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
  isRequesting: boolean
  articleList: Article[]
  tempList: Article[]
  query: string
  params: any;
  page: number;

  constructor(private ArticleService: ArticleService, private CategoryService: CategoryService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.query = params['searchQuery']
      this.query =  this.query.replace("%", " ")
      console.log("starting search...")
      this.articleList = this.getWikiArticleBySearch(this.query)
      if (this.articleList.length / 6 > 1) {
        this.page = this.articleList.length / 6;
      } else {
        this.page = 1;
      }
    })
  }

  public getList(): Article[] {
    var pageArticleList: Article[] = []
    for (var i = (this.page - 1) * 6; this.articleList.length > i; i++) {
      if (pageArticleList.length < 6) {
        if (this.articleList[i] != null)
          console.log("Adding article")
          pageArticleList.push(this.articleList[i])
      } else {
        break;
      }
    }
    return pageArticleList
  }

  public getWikiArticleBySearch(searchQuery: string): Article[] {
    this.isRequesting = true
    var wikiArticleList: Article[] = []
    var matchingArticleList: Article[] = []
    this.ArticleService.getAllArticles().subscribe(success => {
      if (success) {
        this.tempList = this.ArticleService.articleList
        // Get articles with wikicategory only
        for (let article of this.tempList) {
          if (article.wikiCategories !== null) {
            for (let category of article.wikiCategories) {
              if (category !== null) {
                wikiArticleList.push(article)
              }
            }
          }
        }

        // Include if title matches
        for (let article of wikiArticleList) {
          if (article.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            matchingArticleList.push(article)
          }
        }

        // Include if description matches
        for (let article of wikiArticleList) {
          if (article.description.toLowerCase().includes(searchQuery.toLowerCase())) {

            // Only include if it's not already in the list
            if (!matchingArticleList.includes(article)) {
              matchingArticleList.push(article)
            }
          }
        }

        // Split searchQuery so we can search for each word separately
        var searchQueryList: string[] = searchQuery.split(" ")

        // Include articles that have items that contain a full match
        for (let article of wikiArticleList) {
          for (let item of article.articleItems) {

            // Include if text component matches
            if (item.textContents !== null) {
              if (item.textContents.toLowerCase().includes(searchQuery.toLowerCase())) {

                // Only include if it's not already in the list
                if (!matchingArticleList.includes(article)) {
                  matchingArticleList.push(article)
                }
              }
            }

            // Include if subheader component matches
            if (item.subheaderContents !== null) {
              if (item.subheaderContents.toLowerCase().includes(searchQuery.toLowerCase())) {

                // Only include if it's not already in the list
                if (!matchingArticleList.includes(article)) {
                  matchingArticleList.push(article)
                }
              }
            }
          }
        }


        // Include if category matches
        for (let article of wikiArticleList) {
          for (let category of article.wikiCategories) {
            if (category !== null && category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())) {
              // Only include if it's not already in the list
              if (!matchingArticleList.includes(article)) {
                matchingArticleList.push(article)
              }
            }
          }
        }

        // Include articles that have a partial title match
        for (let article of wikiArticleList) {
          for (let search of searchQueryList) {
            if (article.title.toLowerCase().includes(search.toLowerCase())) {
              // Only include if it's not already in the list
              if (!matchingArticleList.includes(article)) {
                matchingArticleList.push(article)
              }
            }
          }
        }

        // Include article items that have a partial match
        for (let article of wikiArticleList) {
          for (let search of searchQueryList) {
            for (let item of article.articleItems) {

              // Include if text component matches
              if (item.textContents !== null) {
                if (item.textContents.toLowerCase().includes(search.toLowerCase())) {

                  // Only include if it's not already in the list
                  if (!matchingArticleList.includes(article)) {
                    matchingArticleList.push(article)
                  }
                }
              }

              // Include if subheader component matches
              if (item.subheaderContents !== null) {
                if (item.subheaderContents.toLowerCase().includes(search.toLowerCase())) {

                  // Only include if it's not already in the list
                  if (!matchingArticleList.includes(article)) {
                    matchingArticleList.push(article)
                  }
                }
              }
            }
          }
        }
        this.isRequesting = false;
      }
    })
    console.log("the search has ended: ")
    console.log(matchingArticleList)
    return matchingArticleList;
  }

  public clickCategory(categoryName: string) {
    let category = this.CategoryService.getWikiCategoryByName(categoryName)
    this.router.navigate(['/browse/', category.categoryUrl])
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
