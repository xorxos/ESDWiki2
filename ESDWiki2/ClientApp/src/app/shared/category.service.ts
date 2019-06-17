import { Injectable } from '@angular/core'
import { TeamCategory, WikiCategory } from './category.model'
import { Http, Headers, RequestOptions } from '@angular/http'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private http2: Http) { }

  public wikiCategories: WikiCategory[] = [];
  public teamCategories: TeamCategory[] = [];
  public newTeamCategory: TeamCategory;
  public newWikiCategory: WikiCategory;
  public newExistingWikiCategory: WikiCategory;
  public newExistingTeamCategory: TeamCategory;

  getWikiCategory(categoryUrl: string): WikiCategory {
    return this.wikiCategories.find(category => category.categoryUrl === categoryUrl)
  }

  getWikiCategoryByName(categoryName: string): WikiCategory {
    return this.wikiCategories.find(category => category.name === categoryName)
  }

  getTeamCategory(categoryName: string): TeamCategory {
    return this.teamCategories.find(category => category.name === categoryName)
  }

  getAllWikiCategories() {
    let token = localStorage.getItem('jwt')
    return this.http.get("/api/wikicategories", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
      .pipe(
      map((data: any[]) => {
        this.wikiCategories = data;
        return true;
      }));
  }

  getAllTeamCategories() {
    let token = localStorage.getItem('jwt')
    return this.http.get("/api/teamcategories", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
      .pipe(
        map((data: any[]) => {
          this.teamCategories = data;
          return true;
        }));
  }

  //Editing Categories
  public SaveExistingTeamCategory(id: number) {
    let token = localStorage.getItem('jwt')
    var name = this.newExistingTeamCategory.name
    let body = JSON.stringify({ name })
    let headers = new Headers({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    })
    let options = new RequestOptions({ headers: headers })
    return this.http2.post("/api/teamcategories/" + id, body, options)
      .pipe(
        map(response => {
        this.newExistingTeamCategory = new TeamCategory();
        console.log(response.status)
          return true;
        }));
  }

  public SaveExistingWikiCategory(id: number) {
    let token = localStorage.getItem('jwt')
    var name = this.newExistingWikiCategory.name
    var categoryUrl = this.newExistingWikiCategory.categoryUrl
    var imageUrl = this.newExistingWikiCategory.imageUrl
    var imagePlaceholder = this.newExistingWikiCategory.imagePlaceholder
    var imageName = this.newExistingWikiCategory.imageName
    var imageSrc = this.newExistingWikiCategory.imagePath
    let body = JSON.stringify({ name, categoryUrl, imageUrl, imagePlaceholder, imageName, imageSrc })
    let headers = new Headers({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    })
    let options = new RequestOptions({ headers: headers })
    return this.http2.post("/api/wikicategories/" + id, body, options)
      .pipe(
      map(response => {
        this.newExistingWikiCategory = new WikiCategory();
          console.log(response.status)
          return true;
        }));
  }

  //Saving new categories
  public SaveNewTeamCategory() {
    let token = localStorage.getItem('jwt')
    var name = this.newTeamCategory.name
    let body = JSON.stringify({ name })
    let headers = new Headers({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    })
    let options = new RequestOptions({ headers: headers})
    return this.http2.post("/api/teamcategories", body, options)
      .pipe(
        map(response => {
        this.newTeamCategory = new TeamCategory();
          return true;
        }));
  }

  public SaveNewWikiCategory() {
    let token = localStorage.getItem('jwt')
    var name = this.newWikiCategory.name
    var categoryUrl = this.newWikiCategory.categoryUrl
    console.log(this.newWikiCategory.categoryUrl)
    var imageUrl = this.newWikiCategory.imageUrl
    var imagePlaceholder = this.newWikiCategory.imagePlaceholder
    var imageName = this.newWikiCategory.imageName
    var imagePath = this.newWikiCategory.imagePath
    let body = JSON.stringify({ name, categoryUrl, imageUrl, imagePlaceholder, imageName, imagePath })
    let headers = new Headers({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    })
    let options = new RequestOptions({ headers: headers })
    return this.http2.post("/api/wikicategories", body, options)
      .pipe(
      map(response => {
        this.newWikiCategory = new WikiCategory();
          return true;
        }));
  }

  //Deleting categories
  public DeleteTeamCategory(id: number) {
    let token = localStorage.getItem('jwt')
    let url = "/api/teamcategories/" + id.toString()
    let headers = new Headers({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    })
    let options = new RequestOptions({ headers: headers })
    return this.http2.delete(url, options) //DELETE api/teamcategories/16
      .pipe(
      map(response => {
        this.getAllTeamCategories();
        console.log(response.status)
          return true;
        }));
  }

  public DeleteWikiCategory(id: number) {
    let token = localStorage.getItem('jwt')
    let url = "/api/wikicategories/" + id.toString()
    let headers = new Headers({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    })
    let options = new RequestOptions({ headers: headers })
    return this.http2.delete(url, options) //DELETE api/wikicategories/16
      .pipe(
        map(response => {
          this.getAllWikiCategories();
          console.log(response.status)
          return true;
        }));
  }
}
