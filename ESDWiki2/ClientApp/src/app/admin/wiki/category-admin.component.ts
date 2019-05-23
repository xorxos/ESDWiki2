import { Component } from '@angular/core'
import { Category } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'public-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})

export class PublicCategoryAdminComponent {

  categories: Category[] = [];

  constructor(private CategoryService: CategoryService) {

  }

  ngOnInit() {
    this.CategoryService.getAllWikiCategories().subscribe(success => {
      if (success) {
        this.categories = this.CategoryService.wikiCategories;
      }
    })
  }
}
