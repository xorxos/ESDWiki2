import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CategoryService } from '../../shared/category.service'
import { WikiCategory } from '../../shared/category.model'
import { ArticleService } from '../../shared/article.service'
import { Observable } from 'rxjs';

@Component({
    templateUrl: './category-articlelist.component.html',
    styleUrls: ['./category-articlelist.component.css']
})
export class CategoryListComponent implements OnInit {
  category: WikiCategory
  allCategories: WikiCategory[]
  categoryListOne: WikiCategory[]
  categoryListTwo: WikiCategory[]
  categoryListThree: WikiCategory[]
    selectedFilter: string
    articles: any

    constructor(private CategoryService: CategoryService, private route: ActivatedRoute, private ArticleService: ArticleService) {

    }

  ngOnInit() {
    this.CategoryService.getAllWikiCategories().subscribe(success => {
      if (success) {
        this.allCategories = this.CategoryService.wikiCategories;
        this.splitAllCategories();
      }
    })
    this.category = this.CategoryService.getWikiCategory(String(this.route.snapshot.params['name']))
    this.articles = this.ArticleService.getArticleByCategory("Skype")
    this.selectedFilter = "All"

  }

    // Function to split allCategories into three lists so they can be displayed in carousel
    splitAllCategories() {
        // CategoryListOne
        this.categoryListOne = []
        for (var i = 0; i <= 5; i++) {
            if (this.allCategories[i] != null) {
                this.categoryListOne.push(this.allCategories[i])
            }
        }

        // CategoryListTwo
        this.categoryListTwo = []
        for (var i = 6; i <= 11; i++) {
            if (this.allCategories[i] != null) {
                this.categoryListTwo.push(this.allCategories[i])
            }
        }

        // CategoryListThree
        this.categoryListThree = []
        for (var i = 12; i <= 17; i++) {
            if (this.allCategories[i] != null) {
                this.categoryListThree.push(this.allCategories[i])
            }
        }
    }
}
