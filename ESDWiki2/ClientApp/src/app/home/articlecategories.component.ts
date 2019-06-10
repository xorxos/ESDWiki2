import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../shared/category.service';
import { WikiCategory } from '../shared/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'articlecategories-component',
  templateUrl: './articlecategories.component.html',
  styleUrls: ['./articlecategories.component.css']
})
export class ArticleCategoriesComponent implements OnInit {
  categories: WikiCategory[] = [];
  moreCategories: boolean = false;
  constructor(private CategoryService: CategoryService, private router: Router) {

  }
  ngOnInit() {
    this.CategoryService.getAllWikiCategories().subscribe(success => {
      if (success) {
        this.categories = this.CategoryService.wikiCategories;
      }
    })
  }

  public onSearchEnter(searchQuery: string) {
    this.router.navigate(['search', searchQuery])
  }

  public browseCategory(name) {
    this.router.navigate(['browse', name])
  }

  public showMoreCategories() {
    this.moreCategories = true;
  }

  public showLessCategories() {
    this.moreCategories = false;
  }
}
