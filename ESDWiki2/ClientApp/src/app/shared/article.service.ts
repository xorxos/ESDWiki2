import { Injectable } from '@angular/core'
import { Article, ArticleItem, WikiCategoryItem, TeamCategoryItem } from './article.model'
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { WikiCategory, TeamCategory } from './category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ArticleService {
  articleList: Article[]
  newArticle: Article
  articleById: Article
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

  public deleteArticle() {
    let token = localStorage.getItem('jwt')
    let articleId: number = this.newArticle.id
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token.toString()
    })
    let options = new RequestOptions({ headers: headers })
    return this.http2.delete("/api/article/" + articleId, options)
      .pipe(
      map(response => {
        return true
      }))
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
    let token = localStorage.getItem('jwt')
    return this.http.get("/api/article/" + id, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      })
    })
      .pipe(
        map((data: any) => {
          this.articleById = data;
          return true;
        }));
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
