import { Component, OnInit } from '@angular/core'
import { CategoryService } from './shared/category.service';

@Component({
    selector: 'articlecategories-component',
    templateUrl: './articlecategories.component.html',
    styleUrls: ['./articlecategories.component.css']
})
export class ArticleCategoriesComponent implements OnInit {
    categories
    constructor(private CategoryService:CategoryService){

    }
    ngOnInit(){
        this.categories = this.CategoryService.getAllCategories()
    }
}