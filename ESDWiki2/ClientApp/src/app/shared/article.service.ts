import { Injectable } from '@angular/core'
import { Article, ArticleItem, WikiCategoryItem, TeamCategoryItem } from './article.model'
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { WikiCategory, TeamCategory } from './category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class ArticleService {
  articleList: Article[]
  newArticle: Article
  existingArticle: Article
  selectedArticleToEdit: Article

  constructor(private http2: Http, private http: HttpClient) { }

  public SaveNewArticle() {
    let token = localStorage.getItem('jwt')
    let article: Article = this.newArticle
    let title: string = this.newArticle.title
    let description: string = this.newArticle.description
    let articleItems: ArticleItem[] = this.newArticle.articleItems
    let wikiCategories: WikiCategoryItem[] = this.newArticle.wikiCategories
    let teamCategories: TeamCategoryItem[] = this.newArticle.teamCategories
    let body = JSON.stringify({ article, title, description, articleItems, wikiCategories, teamCategories })
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token.toString()
    })
    let options = new RequestOptions({ headers: headers })
    return this.http2.post("/api/article", body, options)
      .pipe(
        map(response => {
          this.newArticle = new Article();
          return true;
        }));
  }

  public editArticle() {
    let token = localStorage.getItem('jwt')
    let article: Article = this.newArticle
    let title: string = this.newArticle.title
    let description: string = this.newArticle.description
    let articleItems: ArticleItem[] = this.newArticle.articleItems
    let wikiCategories: WikiCategoryItem[] = this.newArticle.wikiCategories
    let teamCategories: TeamCategoryItem[] = this.newArticle.teamCategories
    let body = JSON.stringify({ article, title, description, articleItems, wikiCategories, teamCategories })
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token.toString()
    })
    let options = new RequestOptions({ headers: headers })
    return this.http2.post("/api/article/" + article.id, body, options)
      .pipe(
        map(response => {
          this.newArticle = new Article();
          return true;
        }));
  }

  getWikiArticleByCategory(categoryName: string): Article[] {
    var WikiArticleList: Article[] = []
    for (let article of this.articleList) {
      for (let category of article.wikiCategories) {
        if (category.categoryName === categoryName) {
          WikiArticleList.push(article)
        }
      }
    }
    return WikiArticleList
  }

  public getWikiArticleBySearch(searchQuery: string): Article[] {
    var wikiArticleList: Article[] = []
    var matchingArticleList: Article[] = []
    this.getAllArticles().subscribe(success => {
      if (success) {

        // Get articles with wikicategory only
        for (let article of this.articleList) {
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
      }
    })
    return matchingArticleList
  }

  getAllArticles() {
    let token = localStorage.getItem('jwt')
    return this.http.get("/api/article", {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    })
      .pipe(
        map((data: any[]) => {
          this.articleList = data;
          return true;
        }));
  }

  getTeamArticles() {
    var teamArticleList: Article[] = []
    for (let article of this.articleList) {
      if (article.teamCategories.length > 0) {
        teamArticleList.push(article)
      }
    }
    return teamArticleList
  }

  getArticleById(id: number) {
    return this.articleList.find(a => a.id === id)
  }


  getTeamArticleByCategory(categoryName: string): Article[] {
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
}
