import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../shared/category.service';
import { WikiCategory } from '../shared/category.model';

@Component({
  selector: 'articlecategories-component',
  templateUrl: './articlecategories.component.html',
  styleUrls: ['./articlecategories.component.css']
})
export class ArticleCategoriesComponent implements OnInit {
  categories: WikiCategory[] = [];
  moreCategories: boolean = false;
  constructor(private CategoryService: CategoryService) {

  }
  ngOnInit() {
    this.CategoryService.getAllWikiCategories().subscribe(success => {
      if (success) {
        this.categories = this.CategoryService.wikiCategories;
      }
    })
  }

  public showMoreCategories() {
    this.moreCategories = true;
  }

  public showLessCategories() {
    this.moreCategories = false;
  }
}
