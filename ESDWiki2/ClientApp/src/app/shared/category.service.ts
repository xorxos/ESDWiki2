import { Injectable } from '@angular/core'
import { Category } from './category.model'
import { Http, Headers, RequestOptions } from '@angular/http'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private http2: Http) { }

  public wikiCategories: Category[] = [];
  public teamCategories: Category[] = [];
  public newTeamCategory: Category;
  public newExistingCategory: Category;

  getWikiCategory(categoryUrl: string): Category {
    return this.wikiCategories.find(category => category.categoryUrl === categoryUrl)
  }

  getTeamCategory(categoryUrl: string): Category {
    return this.teamCategories.find(category => category.categoryUrl === categoryUrl)
  }

  getAllWikiCategories(){
    return this.http.get("/api/wikicategories")
      .pipe(
      map((data: any[]) => {
        this.wikiCategories = data;
        return true;
      }));
  }

  getAllTeamCategories() {
    return this.http.get("/api/teamcategories")
      .pipe(
        map((data: any[]) => {
          this.teamCategories = data;
          return true;
        }));
  }

  public SaveExistingCategory(originalCategory:string) {
    var name = this.newExistingCategory.name
    var categoryUrl = this.newExistingCategory.categoryUrl
    var imageUrl = this.newExistingCategory.imageUrl
    let body = JSON.stringify({ name })
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    return this.http2.post("/api/teamcategories/" + originalCategory, body, options)
      .pipe(
        map(response => {
        this.newExistingCategory = new Category();
        console.log(response.status)
          return true;
        }));
  }

  public SaveNewTeamCategory() {
    var name = this.newTeamCategory.name
    var categoryUrl = this.newTeamCategory.categoryUrl
    var imageUrl = this.newTeamCategory.imageUrl
    let body = JSON.stringify({ name, categoryUrl, imageUrl })
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers})
    return this.http2.post("/api/teamcategories", body, options)
      .pipe(
        map(response => {
          this.newTeamCategory = new Category();
          return true;
        }));
  }
}
