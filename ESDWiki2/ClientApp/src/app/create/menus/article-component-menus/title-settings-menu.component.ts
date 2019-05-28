import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Article, TitleSection } from '../../../shared/article.model';
import { ArticleService } from 'src/app/shared/article.service';

@Component({
    selector: 'title-settings-menu',
    templateUrl: './title-settings-menu.component.html',
    styleUrls: ['./shared-settings-styles.component.css']
})
export class TitleSettingsMenuComponent implements OnInit{
    @Input() newArticle:Article
    @Input() sectionIndex:number
    @Output() updateTitleContentMessage = new EventEmitter<any>()
    @Output() updateBottomSpacingMessage = new EventEmitter<Input>()
    @Output() updateDisplayNameMessage = new EventEmitter<Input>()
    @Output() closeTitleSettingsMenuMessage = new EventEmitter<boolean>()

  title: TitleSection
  constructor(private ArticleService: ArticleService) { }
    ngOnInit() {
        this.getTitle()
    }

    closeTitleSettingsMenu() {
        this.closeTitleSettingsMenuMessage.emit(true)
    }

    updateDisplayName(event:Input) {
        this.updateDisplayNameMessage.emit(event)
    }

    updateTitleContent(event) {
      this.updateTitleContentMessage.emit(event)
      this.newArticle.title = event.target.value
    }
    
    updateBottomSpacing(event:Input) {
        this.updateBottomSpacingMessage.emit(event)
    }

    getTitle() {
        this.title = this.newArticle.articleContents[this.sectionIndex]
    }
}
