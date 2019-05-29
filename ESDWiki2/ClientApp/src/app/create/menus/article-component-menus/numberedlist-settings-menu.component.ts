import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Article, ArticleItem } from '../../../shared/article.model'

@Component({
  selector: 'numberedlist-settings-menu',
  templateUrl: './numberedlist-settings-menu.component.html',
  styleUrls: ['./shared-settings-styles.component.css']
})
export class NumberedListSettingsMenuComponent implements OnInit {
  @Input() newArticle: Article
  @Input() sectionIndex: number
  @Output() updateNumberedListContentMessage = new EventEmitter<object>()
  @Output() updateLeftSpacingMessage = new EventEmitter<Input>()
  @Output() updateTopSpacingMessage = new EventEmitter<Input>()
  @Output() updateBottomSpacingMessage = new EventEmitter<Input>()
  @Output() updateItemSpacingMessage = new EventEmitter<Input>()
  @Output() updateDisplayNameMessage = new EventEmitter<Input>()
  @Output() closeNumberedListSettingsMenuMessage = new EventEmitter<boolean>()
  @Output() deleteComponentMessage = new EventEmitter<number>()
  @Output() deleteListItemMessage = new EventEmitter<number>()
  @Output() createListItemMessage = new EventEmitter()

  numberedList: ArticleItem

  ngOnInit() {
    this.getNumberedList()
  }

  closeNumberedListSettingsMenu() {
    this.closeNumberedListSettingsMenuMessage.emit(true)
  }

  updateDisplayName(event: Input) {
    this.updateDisplayNameMessage.emit(event)
  }

  updateNumberedListContent(event: Input, index: number) {
    this.updateNumberedListContentMessage.emit({ index: index, event: event })
  }

  updateLeftSpacing(event: Input) {
    this.updateLeftSpacingMessage.emit(event)
  }

  updateTopSpacing(event: Input) {
    this.updateTopSpacingMessage.emit(event)
  }

  updateBottomSpacing(event: Input) {
    this.updateBottomSpacingMessage.emit(event)
  }

  updateItemSpacing(event: Input) {
    this.updateItemSpacingMessage.emit(event)
  }

  getNumberedList() {
    this.numberedList = this.newArticle.articleItems[this.sectionIndex]
  }

  deleteComponent() {
    this.deleteComponentMessage.emit(this.sectionIndex)
    this.closeNumberedListSettingsMenuMessage.emit(true)
  }

  createListItem() {
    this.createListItemMessage.emit()
  }

  deleteListItem(index) {
    this.deleteListItemMessage.emit(index)
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
