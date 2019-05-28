import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Article, SubheaderSection } from '../../../shared/article.model';

@Component({
    selector: 'subheader-settings-menu',
    templateUrl: './subheader-settings-menu.component.html',
    styleUrls: ['./shared-settings-styles.component.css']
})
export class SubheaderSettingsMenuComponent implements OnInit{
    
    @Input() newArticle:Article
    @Input() sectionIndex:number
    @Output() updateSubheaderContentMessage = new EventEmitter<Input>()
    @Output() updateLeftSpacingMessage = new EventEmitter<Input>()
    @Output() updateTopSpacingMessage = new EventEmitter<Input>()
    @Output() updateBottomSpacingMessage = new EventEmitter<Input>()
    @Output() updateDisplayNameMessage = new EventEmitter<Input>()
    @Output() closeSubheaderSettingsMenuMessage = new EventEmitter<boolean>()
    @Output() deleteComponentMessage = new EventEmitter<number>()

    subheader:SubheaderSection

    ngOnInit(): void {
        this.getSubheader()
    }

    closeSubheaderSettingsMenu() {
        this.closeSubheaderSettingsMenuMessage.emit(true)
    }

    updateDisplayName(event:Input) {
        this.updateDisplayNameMessage.emit(event)
    }

    updateSubheaderContent(event:Input) {
        this.updateSubheaderContentMessage.emit(event)
    }

    updateLeftSpacing(event:Input) {
        this.updateLeftSpacingMessage.emit(event)
    }

    updateTopSpacing(event:Input) {
        this.updateTopSpacingMessage.emit(event)
    }

    updateBottomSpacing(event:Input) {
        this.updateBottomSpacingMessage.emit(event)
    }

    getSubheader() {
        this.subheader = this.newArticle.articleContents[this.sectionIndex]
    }

    deleteComponent() {
        this.deleteComponentMessage.emit(this.sectionIndex)
        this.closeSubheaderSettingsMenuMessage.emit(true)
    }
}
