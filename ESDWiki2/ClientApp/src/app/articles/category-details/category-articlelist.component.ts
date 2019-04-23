import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CategoryService } from '../shared/category.service'
import { ICategory } from '../shared/category.model'
import { ArticleService } from '../shared/article.service'

@Component({
    templateUrl: './category-articlelist.component.html',
    styleUrls: ['./category-articlelist.component.css']
})
export class CategoryListComponent implements OnInit {
    category: ICategory
    allCategories: ICategory[]
    categoryListOne: ICategory[]
    categoryListTwo: ICategory[]
    categoryListThree: ICategory[]
    selectedFilter: string
    articles: any

    constructor(private CategoryService: CategoryService, private route: ActivatedRoute, private ArticleService: ArticleService) {

    }

    ngOnInit() {
        this.allCategories = this.CategoryService.getAllCategories()
        this.category = this.CategoryService.getCategory(String(this.route.snapshot.params['name']))
        this.articles = this.ArticleService.getArticleByCategory("Skype")
        this.selectedFilter = "All"

        this.splitAllCategories()
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