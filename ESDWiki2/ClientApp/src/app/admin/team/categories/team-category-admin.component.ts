import { Component } from '@angular/core'
import { CategoryService } from 'src/app/shared/category.service';
import { TeamCategory } from 'src/app/shared/category.model';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'category-admin',
  templateUrl: './team-category-admin.component.html',
  styleUrls: ['./team-category-admin.component.css']
})

export class TeamCategoryAdminComponent {
  categories: TeamCategory[] = [];
  isRequesting: boolean = false;
  newCategory: TeamCategory = new TeamCategory();
  newExistingCategory: TeamCategory = new TeamCategory;
  selectedCategoryName: string;
  selectedCategoryId: number;
  constructor(private CategoryService: CategoryService) {

  }
  ngOnInit() {
    this.CategoryService.getAllTeamCategories().subscribe(success => {
      if (success) {
        this.categories = this.CategoryService.teamCategories;
      }
    })
    this.newCategory = {
      id: 0,
      name: ""
    }
    this.newExistingCategory = {
      id: 0,
      name: ""
    }
  }

  public selectExistingCategory(category: TeamCategory) {
    console.log(category.name)
    this.selectedCategoryName = category.name
    this.newExistingCategory.name = category.name
    this.selectedCategoryId = category.id
  }

  public editCategoryName(event) {
    this.newExistingCategory.name = event.target.value;
  }

  public updateNewCategoryName(event: any) {
    this.newCategory.name = event.target.value;
  }

  public editCategory(popover: NgbPopover) {
    this.isRequesting = true;
    this.CategoryService.newExistingTeamCategory = this.newExistingCategory
    this.CategoryService.SaveExistingTeamCategory(this.selectedCategoryId).subscribe(success => {
      if (success) {
        this.isRequesting = false;
        this.clearNewCategory()
        this.CategoryService.getAllTeamCategories().subscribe(success => {
          if (success) {
            this.categories = this.CategoryService.teamCategories;
            console.log("successful edit");
          }
        })
      }
    })
  }

  public deleteCategory(popover: NgbPopover, index: number) {
    this.isRequesting = true;
    this.CategoryService.DeleteTeamCategory(this.selectedCategoryId).subscribe(success => {
      if (success) {
        this.isRequesting = false;
        this.CategoryService.getAllTeamCategories().subscribe(success => {
          if (success) {
            this.categories = this.CategoryService.teamCategories;
            console.log("successful delete");
          }
        })
      }
    })
  }

  public saveCategory(popover: NgbPopover) {
    this.isRequesting = true;
    this.CategoryService.newTeamCategory = this.newCategory
    this.CategoryService.SaveNewTeamCategory().subscribe(success => {
      if (success) {
        this.isRequesting = false;
        this.clearNewCategory();
        popover.close();
        this.CategoryService.getAllTeamCategories().subscribe(success => {
          if (success) {
            this.categories = this.CategoryService.teamCategories;
          }
        })
      }
    })
  }

  

  public clearNewCategory() {
    this.newCategory.name = ""
  }
}
