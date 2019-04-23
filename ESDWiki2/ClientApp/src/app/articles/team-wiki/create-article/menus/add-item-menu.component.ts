import { Component, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'add-item-menu',
    templateUrl: './add-item-menu.component.html',
    styleUrls: ['./add-item-menu.component.css']
})
export class AddItemMenuComponent {

    @Output() addArticleItem = new EventEmitter<string>()
    @Output() closeMenu = new EventEmitter<boolean>()

    closeAddItemMenu() {
        this.closeMenu.emit(true)
    }

    addItem(item: string) {
        this.addArticleItem.emit(item)
    }
}