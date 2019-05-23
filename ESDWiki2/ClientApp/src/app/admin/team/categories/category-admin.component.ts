import { Component } from '@angular/core'
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})

export class TeamCategoryAdminComponent {
  categories: Category[] = [];
  isRequesting: boolean = false;
  newCategory: Category = new Category();
  constructor(private CategoryService: CategoryService) {

  }
  ngOnInit() {
    this.CategoryService.getAllTeamCategories().subscribe(success => {
      if (success) {
        this.categories = this.CategoryService.teamCategories;
      }
    })
    this.newCategory = {
      name: "",
      categoryUrl: "",
      imageUrl: ""

    }
  }

  public updateNewCategoryName(event: any) {
    this.newCategory.name = event.target.value;
  }

  saveCategory(popover: NgbPopover) {
    this.isRequesting = true;
    this.CategoryService.newTeamCategory = this.newCategory
    this.CategoryService.SaveNewTeamCategory().subscribe(success => {
      if (success) {
        this.isRequesting = false;
        this.clearNewCategory()
        this.CategoryService.getAllTeamCategories().subscribe(success => {
          if (success) {
            this.categories = this.CategoryService.teamCategories;
          }
        })
        popover.close()
      }
    })
  }

  clearNewCategory() {
    this.newCategory.name = ""
  }
}
