import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Article, TeamCategoryItem, WikiCategoryItem } from '../../shared/article.model'
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/article.service';
import { TeamCategory, WikiCategory } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'article-contents-menu',
  templateUrl: './article-contents-menu.component.html',
  styleUrls: ['./article-contents-menu.component.css']
})
export class ArticleContentsMenuComponent implements OnInit {

  @Input() newArticle: Article
  @Output() openAddItemMenu = new EventEmitter<boolean>();
  @Output() openTitleSettings = new EventEmitter<number>();
  @Output() openTextSettings = new EventEmitter<number>();
  @Output() openSubheaderSettings = new EventEmitter<number>();
  @Output() openBulletedListSettings = new EventEmitter<number>();
  @Output() openNumberedListSettings = new EventEmitter<number>();
  @Output() openImageLeftSettings = new EventEmitter<number>();
  @Output() openImageRightSettings = new EventEmitter<number>();
  @Output() openFullWidthImageSettings = new EventEmitter<number>();
  @Output() moveComponentUpMessage = new EventEmitter<number>();
  @Output() moveComponentDownMessage = new EventEmitter<number>();
  @Output() highlightComponentMessage = new EventEmitter<number>();
  @Output() dehighlightComponentMessage = new EventEmitter<number>();

  showSections: boolean
  showArticleSettings: boolean
  isPublicChecked: boolean = false
  isRequesting: boolean = false
  missingFields: boolean = true
  teamCategories: TeamCategory[]
  wikiCategories: WikiCategory[]
  selectedTeamCategory: string = "Choose..."
  selectedWikiCategory: string = "Choose..."

  constructor(private router: Router, private ArticleService: ArticleService, private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.showArticleSettings = false
    this.showSections = true
    // Get current categories
    this.CategoryService.getAllTeamCategories().subscribe(success => {
      if (success) {
        this.teamCategories = this.CategoryService.teamCategories;
      }
    })
    this.CategoryService.getAllWikiCategories().subscribe(success => {
      if (success) {
        this.wikiCategories = this.CategoryService.wikiCategories;
      }
    })
    // Check if team category or wiki category is set
    if ((this.newArticle.teamCategories.length > 0) || (this.newArticle.wikiCategories.length > 0)) {
      // If team category is set, update the selected team category in component
      if (this.newArticle.teamCategories.length > 0) {
        this.selectedTeamCategory = this.newArticle.teamCategories[0].categoryName
        this.missingFields = false
      }
      // If wiki category is set, update the selected wiki category in component
      if (this.newArticle.wikiCategories.length > 0) {
        this.selectedWikiCategory = this.newArticle.wikiCategories[0].categoryName
        this.isPublicChecked = true
        this.missingFields = false
      }
    } else {
      this.missingFields = true
    }
  }

  onWikiCategoryChange(value: string) {
    if (value !== "Choose...") {
      // Check if theres a currently set category
      if (this.newArticle.wikiCategories.length > 0) {
        // If so, replace it with the new category
        this.newArticle.wikiCategories.splice(0, 1, new WikiCategoryItem({ categoryName: value }))
      } else {
        // Else, just add the category
        this.newArticle.wikiCategories.push(new WikiCategoryItem({ categoryName: value }))
      }
      this.missingFields = false
    } else {
      this.newArticle.wikiCategories.splice(0, 1)
      // Check whether a team or wiki category is set. If not, warn user
      if (!(this.newArticle.teamCategories.length > 0)) {
        this.missingFields = true
      }
    }
    
    this.selectedWikiCategory = value
  }

  onTeamCategoryChange(value: string) {
    if (value !== "Choose...") {
      // Check if theres a currently set category
      if (this.newArticle.teamCategories.length > 0) {
        // If so, replace it with the new category
        this.newArticle.teamCategories.splice(0, 1, new TeamCategoryItem({ categoryName: value }))
      } else {
        // Else, just add the category
        this.newArticle.teamCategories.push(new TeamCategoryItem({ categoryName: value }))
      }
      this.missingFields = false
    } else {
      // Choose... is selected. Remove the existing category and do not add a new one
      this.newArticle.teamCategories.splice(0, 1)
      // Check whether a wiki category is set. If not, warn user
      if (!(this.newArticle.wikiCategories.length > 0)) {
        this.missingFields = true
      }
    }
    
    this.selectedTeamCategory = value
  }

  public saveArticle() {
    this.isRequesting = true;
    this.ArticleService.newArticle = this.newArticle
    this.ArticleService.SaveNewArticle().subscribe(success => {
      if (success) {
        this.isRequesting = false;
        this.router.navigate(['/team-wiki'])
      }
    })
  }

  checked(event) {
    this.isPublicChecked = event.target.checked;
  }

  showAddItemMenu() {
    this.openAddItemMenu.emit(true)
  }

  toggleShowSections() {
    if (this.showSections === false) {
      this.showSections = true
      this.showArticleSettings = false
    }
  }

  toggleShowArticleSettings() {
    if (this.showArticleSettings === false) {
      this.showArticleSettings = true
      this.showSections = false
    }
  }

  toggleTitleSettings(itemIndex) {
    this.openTitleSettings.emit(itemIndex)
  }

  toggleTextSettings(itemIndex) {
    this.openTextSettings.emit(itemIndex)
  }

  toggleSubheaderSettings(itemIndex) {
    this.openSubheaderSettings.emit(itemIndex)
  }

  toggleBulletedListSettings(itemIndex) {
    this.openBulletedListSettings.emit(itemIndex)
  }

  toggleNumberedListSettings(itemIndex) {
    this.openNumberedListSettings.emit(itemIndex)
  }

  toggleImageLeftSettings(itemIndex) {
    this.openImageLeftSettings.emit(itemIndex)
  }

  toggleImageRightSettings(itemIndex) {
    this.openImageRightSettings.emit(itemIndex)
  }

  toggleFullWidthImageSettings(itemIndex) {
    this.openFullWidthImageSettings.emit(itemIndex)
  }


  /** Functions to check which component is in newArticle.articleContents */
  isTitleComponent(component): boolean {
    if (component.selector === "Title") {
      return true
    } else return false
  }

  isTextComponent(component): boolean {
    if (component.selector === "Text") {
      return true
    } else return false
  }

  isSubheaderComponent(component): boolean {
    if (component.selector === "Subheader") {
      return true
    } else return false
  }

  isBulletedListComponent(component): boolean {
    if (component.selector === "Bulleted List") {
      return true
    } else return false
  }

  isNumberedListComponent(component): boolean {
    if (component.selector === "Numbered List") {
      return true
    } else return false
  }

  isImageLeftComponent(component): boolean {
    if (component.selector === "Image-left With Text") {
      return true
    } else return false
  }

  isImageRightComponent(component): boolean {
    if (component.selector === "Image-right With Text") {
      return true
    } else return false
  }

  isFullWidthImageComponent(component): boolean {
    if (component.selector === "Full-Width Image") {
      return true
    } else return false
  }

  /** Functions to send messages up to the parent to re-arrange components */
  moveComponentUp(index) {
    this.moveComponentUpMessage.emit(index)
  }

  moveComponentDown(index) {
    this.moveComponentDownMessage.emit(index)
  }

  /** Function to inform parent of hovered component */
  highlightComponent(index) {
    this.highlightComponentMessage.emit(index)
  }

  dehighlightComponent(index) {
    this.dehighlightComponentMessage.emit(index)
  }
}
