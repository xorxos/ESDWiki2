import { Injectable } from '@angular/core'
import { Article, ArticleItem, WikiCategoryItem, TeamCategoryItem } from './article.model'
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { WikiCategory, TeamCategory } from './category.model';
import { HttpClient } from '@angular/common/http';

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

  getWikiArticleByCategory(category: WikiCategory): Article[] {
    return this.articleListByCategory(category)
  }

  getAllArticles() {
    return this.http.get("/api/article")
      .pipe(
        map((data: any[]) => {
        this.articleList = data;
        console.log(this.articleList)
        return true;
      }));
  }

  getArticleById(id: number) {
    return this.articleList.find(a => a.id === id)
  }

  articleListByCategory(category: WikiCategory): Article[] {
    return this.articleList
  }

  getTeamArticleByCategory(category: TeamCategory): Article[] {
    return this.articleList
  }
}
