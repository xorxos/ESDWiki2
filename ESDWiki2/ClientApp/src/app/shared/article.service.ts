import { Injectable } from '@angular/core'
import { Article } from './article.model'
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ArticleService {
  articleList: Article[]
  newArticle: Article
  existingArticle: Article

  constructor(private http: Http) { }

  public SaveNewArticle() {
    let article: Article = this.newArticle
    let title: string = this.newArticle.title
    let body = JSON.stringify({ article, title })
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    return this.http.post("/api/article", body, options)
      .pipe(
        map(response => {
          this.newArticle = new Article();
          return true;
        }));
  }

    getArticleByCategory(category: string): Article[] {
        return this.articleListByCategory(category)
    }

    getAllArticles() {
        return ARTICLES
    }

    articleListByCategory(category: string): Article[] {
        this.articleList = []
        ARTICLES.forEach(item => {
          if (item.wikiCategories.includes(category)) {
                this.articleList.push(item)
          }
        })
        console.log(this.articleList)
        return this.articleList
    }

    getTeamArticleByCategory(category:string): Article[] {
        this.articleList = []
        TEAMARTICLES.forEach(item => {
          if (item.teamCategories.includes(category)) {
               this.articleList.push(item)
           }
        })
        return this.articleList
    }
}

const ARTICLES: Article[] = [
    {
        id: 1,
        title: "Windows - How to Sign-in to Skype",
        description: "Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
        articleContents: [],
        wikiCategories: ["Skype", "PC"],
        teamCategories: []
    },
    {
        id: 2,
        title: "Mac - How to Sign-in to Skype",
        description: "22Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
        articleContents: [],
        wikiCategories: ["Skype", "Mac"],
        teamCategories: []
    },
    {
        id: 3,
        title: "iPhone - How to Sign-in to Skype",
        description: "22Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
        articleContents: [],
        wikiCategories: ["Skype", "Mobile Devices"],
        teamCategories: []
    },
    {
        id: 4,
        title: "Android - How to Sign-in to Skype",
        description: "22Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
        articleContents: [],
        wikiCategories: ["Skype", "Mobile Devices"],
        teamCategories: []
    },
    {
        id: 5,
        title: "How to Screen Share in Skype",
        description: "22Skype typically will log you in automatically, but when it for some reason doesn't, this guide will walk you through the process of manually signing in.",
        articleContents: [],
        wikiCategories: ["Skype", "Mobile Devices"],
        teamCategories: []
    },
]

const TEAMARTICLES: Article[] = [
    {
        id: 1,
        title: "How to add members to a security group",
        description: "This is a step-by-step guide on how to add or remove members of a security group in active directory.",
        articleContents: [],
        wikiCategories: [],
        teamCategories: ["Active Directory", "PC"]
    },
    {
        id: 2,
        title: "VPN security group memberships",
        description: "This article will walk you through which memberships are required for VPN access.",
        articleContents: [],
        wikiCategories: [],
        teamCategories: ["Active Directory", "Mac"]
    },
    {
        id: 3,
        title: "How to change the manager on an employee account",
        description: "This is a guide on how to change the manager of an employee account in active directory.",
        articleContents: [],
        wikiCategories: [],
        teamCategories: ["Active Directory", "Mobile Devices"]
    },
    {
        id: 4,
        title: "How to find a bitlocker key",
        description: "This guide will walk you through how to find a bitlocker key in active directory",
        articleContents: [],
        wikiCategories: [],
        teamCategories: ["Active Directory", "Mobile Devices"]
    },
    {
        id: 5,
        title: "How to add an employee ID",
        description: "This is a step-by-step guide on how to add an employee ID to an active directory account.",
        articleContents: [],
        wikiCategories: [],
        teamCategories: ["Active Directory", "Mobile Devices"]
    },

]
