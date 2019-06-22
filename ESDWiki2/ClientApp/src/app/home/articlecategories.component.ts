import { Component, OnInit, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { CategoryService } from '../shared/category.service';
import { WikiCategory } from '../shared/category.model';
import { Router } from '@angular/router';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'articlecategories-component',
  templateUrl: './articlecategories.component.html',
  styleUrls: ['./articlecategories.component.css']
})
export class ArticleCategoriesComponent implements OnInit {
  categories: WikiCategory[] = [];
  moreCategories: boolean = false;
  constructor(private CategoryService: CategoryService, private ArticleService: ArticleService, private router: Router) {

  }
  ngOnInit() {
    this.CategoryService.getAllWikiCategories().subscribe(success => {
      if (success) {
        this.categories = this.CategoryService.wikiCategories;
      }
    })
    this.ArticleService.getAllArticles();
  }

  public onSearchEnter(searchQuery: string) {
    this.router.navigate(['search', searchQuery.replace(" ", "%")])
  }

  public clickTicket() {
    (window as any).open('http://iform.interpublic.com/', "_blank");
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
