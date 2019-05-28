import { Injectable } from '@angular/core'
import { Article, ArticleItem } from './article.model'
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { WikiCategory, TeamCategory } from './category.model';

@Injectable()
export class ArticleService {
  articleList: Article[]
  newArticle: Article
  existingArticle: Article

  constructor(private http: Http) { }

  public SaveNewArticle() {
    let article: Article = this.newArticle
    let title: string = this.newArticle.title
    let description: string = this.newArticle.description
    let articleItems: ArticleItem[] = this.newArticle.articleItems
    let wikiCategories: WikiCategory[] = this.newArticle.wikiCategories
    let teamCategories: TeamCategory[] = this.newArticle.teamCategories
    let body = JSON.stringify({ article, title, description, articleItems, wikiCategories, teamCategories })
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    return this.http.post("/api/article", body, options)
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
    return ARTICLES
  }

  articleListByCategory(category: WikiCategory): Article[] {
    this.articleList = []
    ARTICLES.forEach(item => {
      item.wikiCategories.forEach(wikiCategory => {
        if (wikiCategory.name == category.name) {
          this.articleList.push(item)
        }
      })
    })
    console.log(this.articleList)
    return this.articleList
  }

  getTeamArticleByCategory(category: TeamCategory): Article[] {
    this.articleList = []
    TEAMARTICLES.forEach(item => {
      item.teamCategories.forEach(teamCategory => {
        if (teamCategory.name == category.name) {
          this.articleList.push(item)
        }
      })
    })
    return this.articleList
  }
}

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Windows - How to Sign-in to Skype",
    description: "Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
    articleItems: [],
    wikiCategories: [],
    teamCategories: []
  },
  {
    id: 2,
    title: "Mac - How to Sign-in to Skype",
    description: "22Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
    articleItems: [],
    wikiCategories: [new WikiCategory({ name: "Skype" })],
    teamCategories: []
  },
  {
    id: 3,
    title: "iPhone - How to Sign-in to Skype",
    description: "22Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
    articleItems: [],
    wikiCategories: [],
    teamCategories: []
  },
  {
    id: 4,
    title: "Android - How to Sign-in to Skype",
    description: "22Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
    articleItems: [],
    wikiCategories: [],
    teamCategories: []
  },
  {
    id: 5,
    title: "How to Screen Share in Skype",
    description: "22Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
    articleItems: [],
    wikiCategories: [],
    teamCategories: []
  },
]

const TEAMARTICLES: Article[] = [
  {
    id: 1,
    title: "How to add members to a security group",
    description: "This is a step-by-step guide on how to add or remove members of a security group in active directory.",
    articleItems: [],
    wikiCategories: [],
    teamCategories: []
  },
  {
    id: 2,
    title: "VPN security group memberships",
    description: "This article will walk you through which memberships are required for VPN access.",
    articleItems: [],
    wikiCategories: [],
    teamCategories: []
  },
  {
    id: 3,
    title: "How to change the manager on an employee account",
    description: "This is a guide on how to change the manager of an employee account in active directory.",
    articleItems: [],
    wikiCategories: [],
    teamCategories: []
  },
  {
    id: 4,
    title: "How to find a bitlocker key",
    description: "This guide will walk you through how to find a bitlocker key in active directory",
    articleItems: [],
    wikiCategories: [],
    teamCategories: []
  },
  {
    id: 5,
    title: "How to add an employee ID",
    description: "This is a step-by-step guide on how to add an employee ID to an active directory account.",
    articleItems: [],
    wikiCategories: [],
    teamCategories: []
  },

]
