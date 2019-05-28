import { Component, ViewChild, ElementRef } from '@angular/core'
import { WikiCategory } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'public-category-admin',
  templateUrl: './wiki-category-admin.component.html',
  styleUrls: ['./wiki-category-admin.component.css']
})

export class PublicCategoryAdminComponent {

  categories: WikiCategory[] = [];
  isRequesting: boolean = false;
  newCategory: WikiCategory = new WikiCategory();
  newExistingWikiCategory: WikiCategory = new WikiCategory;
  selectedCategoryName: string;
  selectedCategoryId: number;
  public response: { 'dbPath': '' }; 
  public isCreate: boolean;
  public imagePath;
  public message: string;
  imgSrc: any

  constructor(private CategoryService: CategoryService) {

  }

  ngOnInit() {
    this.CategoryService.getAllWikiCategories().subscribe(success => {
      if (success) {
        this.categories = this.CategoryService.wikiCategories;
      }
    })
    this.newCategory = {
      id: 0,
      name: "",
      categoryUrl: "",
      imageUrl: "",
      imagePlaceholder: "images\\placeholder-image.jpg",
      imageName: "",
      imagePath: ""
    }
    this.newExistingWikiCategory = {
      id: 0,
      name: "",
      categoryUrl: "",
      imageUrl: "",
      imagePlaceholder: "images\\placeholder-image.jpg",
      imageName: "",
      imagePath: ""
    }
    this.isCreate = true;
  }

  public selectExistingCategory(category: WikiCategory) {
    console.log(category.name)
    this.selectedCategoryName = category.name
    this.newExistingWikiCategory.name = category.name
    this.newExistingWikiCategory.categoryUrl = category.categoryUrl
    this.newExistingWikiCategory.imageUrl = category.imageUrl
    this.newExistingWikiCategory.imageName = category.imageName
    this.newExistingWikiCategory.imagePath = category.imagePath
    this.selectedCategoryId = category.id
    this.imgSrc = category.imageUrl
  }

  selectAddCategory(popover: NgbPopover) {
    popover.open()
    this.imgSrc = ""
    this.newCategory.name = ""
    this.newCategory.categoryUrl = ""
    this.newCategory.imageUrl = ""
    this.newCategory.imageName = ""
    this.newCategory.imagePath = ""
  }

  public editCategoryName(event) {
    this.newExistingWikiCategory.name = event.target.value;
    var newCategoryUrl: string = event.target.value;
    newCategoryUrl = newCategoryUrl.toLowerCase();
    newCategoryUrl = newCategoryUrl.replace(" ", "_")
    console.log(newCategoryUrl)
    this.newExistingWikiCategory.categoryUrl = newCategoryUrl;
  }

  public updateNewCategoryName(event: any) {
    this.newCategory.name = event.target.value;
    var newCategoryUrl: string = event.target.value;
    newCategoryUrl = newCategoryUrl.toLowerCase();
    newCategoryUrl = newCategoryUrl.replace(" ", "_")
    this.newCategory.categoryUrl = newCategoryUrl;
  }

  public editCategory(popover: NgbPopover) {
    this.isRequesting = true;
    this.CategoryService.newExistingWikiCategory = this.newExistingWikiCategory
    this.CategoryService.SaveExistingWikiCategory(this.selectedCategoryId).subscribe(success => {
      if (success) {
        this.isRequesting = false;
        this.clearNewCategory()
        this.CategoryService.getAllWikiCategories().subscribe(success => {
          if (success) {
            this.categories = this.CategoryService.wikiCategories;
            console.log("successful edit");
          }
        })
      }
    })
  }

  public deleteCategory(popover: NgbPopover, index: number) {
    this.isRequesting = true;
    this.CategoryService.DeleteWikiCategory(this.selectedCategoryId).subscribe(success => {
      if (success) {
        this.isRequesting = false;
        this.CategoryService.getAllWikiCategories().subscribe(success => {
          if (success) {
            this.categories = this.CategoryService.wikiCategories;
            console.log("successful delete");
          }
        })
      }
    })
  }

  public saveCategory(popover: NgbPopover) {
    this.isRequesting = true;
    this.CategoryService.newWikiCategory = this.newCategory
    this.CategoryService.SaveNewWikiCategory().subscribe(success => {
      if (success) {
        this.isRequesting = false;
        this.clearNewCategory();
        popover.close();
        this.CategoryService.getAllWikiCategories().subscribe(success => {
          if (success) {
            this.categories = this.CategoryService.wikiCategories;
          }
        })
      }
    })
  }

  public clearNewCategory() {
    this.newCategory.name = ""
  }

  public returnToCreate = () => {
    this.isCreate = true;
  }

  public uploadFinished = (event) => {
    this.response = event;
    this.imgSrc = this.createImgPath(this.response.dbPath)
    this.newExistingWikiCategory.imagePath = this.imgSrc
    this.newExistingWikiCategory.imageUrl = this.imgSrc
    this.newCategory.imagePath = this.imgSrc
    this.newCategory.imageUrl = this.imgSrc
  }

  public createImgPath = (serverPath: string) => {
    return `http://localhost:5000/${serverPath}`;
  }
}
