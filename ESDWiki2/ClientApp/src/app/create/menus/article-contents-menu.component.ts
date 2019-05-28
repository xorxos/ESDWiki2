import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Article } from '../../shared/article.model'
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/article.service';

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

  constructor(private router: Router, private ArticleService: ArticleService) { }

  ngOnInit(): void {
    this.showArticleSettings = false
    this.showSections = true
    console.log(this.newArticle)
  }

  public saveArticle() {
    this.isRequesting = true;
    this.ArticleService.newArticle = this.newArticle
    console.log(this.newArticle)
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
    console.log(component)
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
