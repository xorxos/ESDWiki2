import { Component } from '@angular/core'
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})

export class TeamCategoryAdminComponent {
  categories: Category[] = [];
  constructor(private CategoryService: CategoryService) {

  }
  ngOnInit() {
    this.CategoryService.getAllTeamCategories().subscribe(success => {
      if (success) {
        this.categories = this.CategoryService.teamCategories;
      }
    })
  }
}
