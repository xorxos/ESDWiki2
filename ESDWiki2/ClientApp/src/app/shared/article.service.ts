import { Injectable } from '@angular/core'
import { Article, ArticleItem, WikiCategoryItem, TeamCategoryItem } from './article.model'
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { WikiCategory, TeamCategory } from './category.model';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class ArticleService {
  articleList: Article[]
  newArticle: Article
  existingArticle: Article

  constructor(private http2: Http, private http: HttpClient) { }

  public SaveNewArticle() {
    let article: Article = this.newArticle
    let title: string = this.newArticle.title
    let description: string = this.newArticle.description
    let articleItems: ArticleItem[] = this.newArticle.articleItems
    let wikiCategories: WikiCategoryItem[] = this.newArticle.wikiCategories
    let teamCategories: TeamCategoryItem[] = this.newArticle.teamCategories
    let body = JSON.stringify({ article, title, description, articleItems, wikiCategories, teamCategories })
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    return this.http2.post("/api/article", body, options)
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
    return this.http.get("/api/article")
      .pipe(
        map((data: any[]) => {
        this.articleList = data;
        return true;
      }));
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
