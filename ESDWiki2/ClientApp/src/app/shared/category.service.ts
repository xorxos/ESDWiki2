import { Injectable } from '@angular/core'
import  { Category } from './category.model'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) { }

  public wikiCategories: Category[] = [];
  public teamCategories: Category[] = [];

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
}
