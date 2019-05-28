import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Article, TextSection } from '../../../shared/article.model';

@Component({
  selector: 'text-settings-menu',
  templateUrl: './text-settings-menu.component.html',
  styleUrls: ['./shared-settings-styles.component.css']
})
export class TextSettingsMenuComponent implements OnInit {

  @Input() newArticle: Article
  @Input() sectionIndex: number
  @Output() updateTextContentMessage = new EventEmitter<Input>()
  @Output() updateLeftSpacingMessage = new EventEmitter<Input>()
  @Output() updateTopSpacingMessage = new EventEmitter<Input>()
  @Output() updateBottomSpacingMessage = new EventEmitter<Input>()
  @Output() updateDisplayNameMessage = new EventEmitter<Input>()
  @Output() closeTextSettingsMenuMessage = new EventEmitter<boolean>()
  @Output() deleteComponentMessage = new EventEmitter<number>()

  textComponent: TextSection

  ngOnInit(): void {
    this.getText()
  }

  closeTextSettingsMenu() {
    this.closeTextSettingsMenuMessage.emit(true)
  }

  updateDisplayName(event: Input) {
    this.updateDisplayNameMessage.emit(event)
  }

  updateTextContent(event: Input) {
    this.updateTextContentMessage.emit(event)
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

  getText() {
    this.textComponent = <TextSection>this.newArticle.articleItems[this.sectionIndex]
  }

  deleteComponent() {
    this.deleteComponentMessage.emit(this.sectionIndex)
    this.closeTextSettingsMenuMessage.emit(true)
  }
}
