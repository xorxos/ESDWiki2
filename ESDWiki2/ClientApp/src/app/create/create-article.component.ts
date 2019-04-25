import { Component, OnInit } from '@angular/core'
import { IArticle, 
         ITitleSection, 
         ITextSection, 
         ISubheaderSection,
         IFullWidthImageSection, 
         IBulletedListSection, 
         INumberedListSection } from '../shared/article.model';

@Component({
    templateUrl: 'create-article.component.html',
    styleUrls: ['create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

    /** Booleans that handle when a menu is shown */
    showArticleContents: boolean
    showArticleSettings: boolean
    showAddItemMenu: boolean
    showTitleSettings: boolean
    showTextSettings: boolean
    showSubheaderSettings: boolean
    showFullWidthImageSettings: boolean
    showBulletedListSettings: boolean
    showNumberedListSettings: boolean

    /** Index number of the component when changes are made in the settings */
    sectionIndex:number

    /** Variables used when updating list objects such as bulleted lists and numbered lists */
    selectedBulletedList

    newArticle: IArticle
    titleSection: ITitleSection
    textSection: ITextSection
    subheaderSection: ISubheaderSection
    fullWidthImageSection: IFullWidthImageSection
    bulletedListSection: IBulletedListSection
    numberedListSection: INumberedListSection

    ngOnInit() {
        /** Setting the initial boolean values to dictate which menu to show */
        this.setMenuBooleansFalse()
        this.showArticleContents = true
        this.titleSection = {
            selector: "Title",
            displayName: "Title",
            contents: "This is a Title",
            bottomSpacing: 0,
            hovered: false
        }
        this.newArticle = {
            id: 20,
            description: "",
            articleContents: [this.titleSection],
            title: this.titleSection.contents.toString(),
            categoryTags: []
        }
    }

    /** Functions to handle which menu or component is being shown */
    toggleShowAddItemMenu(event) {
        this.setMenuBooleansFalse()
        this.showAddItemMenu = event
    }

    toggleSettings() {
        this.setMenuBooleansFalse()
        this.showArticleSettings = true
    }

    toggleConfigurationSection(event) {
        this.setMenuBooleansFalse()
        this.showArticleContents = event
    }

    toggleTitleSettings(event) {
        this.setMenuBooleansFalse()
        this.sectionIndex = event
        this.showTitleSettings = true
    }

    toggleTextSettings(event) {
        this.setMenuBooleansFalse()
        this.sectionIndex = event
        this.showTextSettings = true
    }

    toggleSubheaderSettings(event) {
        this.setMenuBooleansFalse()
        this.sectionIndex = event
        this.showSubheaderSettings = true
    }

    toggleFullWidthImageSettings(event) {
        this.setMenuBooleansFalse()
        this.sectionIndex = event
        this.showFullWidthImageSettings = true
    }

    toggleBulletedListSettings(event) {
        this.setMenuBooleansFalse()
        this.sectionIndex = event
        this.showBulletedListSettings = true
    }

    toggleNumberedListSettings(event) {
        this.setMenuBooleansFalse()
        this.sectionIndex = event
        this.showNumberedListSettings = true
    }

    /** Re-usable function for toggling boolean values */
    setMenuBooleansFalse() {
        this.showArticleSettings = false
        this.showAddItemMenu = false
        this.showArticleContents = false
        this.showTitleSettings = false
        this.showTextSettings = false
        this.showSubheaderSettings = false
        this.showFullWidthImageSettings = false
        this.showBulletedListSettings = false
        this.showNumberedListSettings = false
    }

    /** Shared component update functions */
    updateDisplayName(event) {
        this.newArticle.articleContents[this.sectionIndex].displayName = event.target.value
    }

    /** Functions to re-arrange newArticle.articleContents */
    moveComponentUp(index) {
        var oldIndex = index
        var newIndex = index - 1
        var item = this.newArticle.articleContents[oldIndex]
        if(newIndex > 0) {
            this.newArticle.articleContents.splice(oldIndex, 1)
            this.newArticle.articleContents.splice(newIndex, 0, item)
        }
    }

    moveComponentDown(index) {
        var oldIndex = index
        var newIndex = index + 1
        var item = this.newArticle.articleContents[oldIndex]
        if(newIndex <= this.newArticle.articleContents.length) {
            this.newArticle.articleContents.splice(oldIndex, 1)
            this.newArticle.articleContents.splice(newIndex, 0, item)
        }
    }

    /** Function to highlight the hovered component */
    highlightComponent(index) {
        /** Remove all existing highlights */
        for (let i = 0; i < this.newArticle.articleContents.length; i++) {
            this.newArticle.articleContents[i].hovered = false
        }

        /** Highlight the new hovered component */
        this.newArticle.articleContents[index].hovered = true
    }

    dehighlightComponent(index) {
        this.newArticle.articleContents[index].hovered = false
    }

    /** Functions To Update Component Spacing */
    updateLeftSpacing(event) {
        try {
            this.newArticle.articleContents[this.sectionIndex].leftSpacing = event.target.value
        } catch(e) {
            console.log('could not set left spacing value')
        }
    }

    updateTopSpacing(event) {
        try {
            this.newArticle.articleContents[this.sectionIndex].topSpacing = event.target.value
        } catch(e) {
            console.log('could not set top spacing value')
        }
    }

    updateBottomSpacing(event) {
        try {
            this.newArticle.articleContents[this.sectionIndex].bottomSpacing = event.target.value
        } catch(e) {
            console.log('could not set bottom spacing value')
        }
    }

    updateItemSpacing(event) {
        try {
            this.newArticle.articleContents[this.sectionIndex].itemSpacing = event.target.value
        } catch(e) {
            console.log('could not set item spacing value')
        }
    }

    /** Update Title Component Functions */
    updateTitleContent(event) {
        try {
            this.newArticle.articleContents[this.sectionIndex].contents = event.target.value
        } catch(e) {
            console.log('could not set text-area value')
            console.log(e)
        }
    }

    /** Update Subheader Component Functions */
    updateSubheaderContent(event) {
        try {
            this.newArticle.articleContents[this.sectionIndex].contents = event.target.value
        } catch(e) {
            console.log('could not set text-area value')
        }
    }

    /** Update Text Component Functions */
    updateTextContent(event) {
        try {
            this.newArticle.articleContents[this.sectionIndex].contents = event.target.value
        } catch(e) {
            console.log('could not set text-area value')
        }
    }

    /** Update BulletedList & NumberedList Component Functions */
    updateBulletedListContent(event){
        console.log("Updating Bullets")
        try {
            this.newArticle.articleContents[this.sectionIndex].contents[event.index] = event.event.target.value
        } catch(e) {
            console.log('could not set text-area value')
        }
    }

    updateNumberedListContent(event){
        console.log("Updating Numbered")
        try {
            this.newArticle.articleContents[this.sectionIndex].contents[event.index] = event.event.target.value
        } catch(e) {
            console.log('could not set text-area value')
        }
    }

    deleteListItem(index) {
        if(index !== -1) {
            this.newArticle.articleContents[this.sectionIndex].contents.splice(index, 1)
            console.log("Deleting list item: " + index)
        }
    }

    createListItem() {
        this.newArticle.articleContents[this.sectionIndex].contents.push("New Item")
    }

    /** Functions to update and get images */
    updateFullWidthImageContent(file) {
        this.newArticle.articleContents[this.sectionIndex].image = file
    }

    updateFullWidthImageSrc(src) {
        this.newArticle.articleContents[this.sectionIndex].src = src
    }

    updateFullWidthImageName(name: string) {
        this.newArticle.articleContents[this.sectionIndex].name = name
    }

    rangeChange(event:number) {
        this.newArticle.articleContents[this.sectionIndex].width = event
    }

    /** Function to remove component */
    deleteComponent(index:number) {
        if (index !== -1) {
            this.newArticle.articleContents.splice(index, 1)
        }
    }

    /** Functions to add components */
    addArticleItem(event) {
        if(event === "Text"){
            this.addTextComponent()
        }else if (event === "Subheader") {
            this.addSubheaderComponent()
        }else if (event === "Bulleted List") {
            this.addBulletedListComponent()
        }else if (event === "Numbered List") {
            this.addNumberedListComponent()
        }else if (event === "FullWidth Image") {
            this.addFullWidthImageComponent()
        }
        this.toggleConfigurationSection(true)
    }

    addTextComponent() {
        this.textSection = {
            selector: "Text",
            displayName: "Text",
            contents: "This is some text. Extra spaces and returns are shown exactly as entered.",
            leftSpacing: 2,
            topSpacing: 0,
            bottomSpacing: 0,
            hovered: false
        }
        this.newArticle.articleContents.push(this.textSection)
    }

    addSubheaderComponent() {
        this.subheaderSection = {
            selector: "Subheader",
            displayName: "Subheader",
            contents: "Step 1",
            leftSpacing: 0,
            topSpacing: 0,
            bottomSpacing: 0,
            hovered: false
        }
        this.newArticle.articleContents.push(this.subheaderSection)
    }

    addBulletedListComponent() {
        this.bulletedListSection = {
            selector: "Bulleted List",
            displayName: "Bulleted List",
            contents: ["Item 1", "Item 2", "Item 3"],
            leftSpacing: 40,
            topSpacing: 0,
            bottomSpacing: 0,
            itemSpacing: 14,
            hovered: false
        }
        this.newArticle.articleContents.push(this.bulletedListSection)
    }

    addNumberedListComponent() {
        this.numberedListSection = {
            selector: "Numbered List",
            displayName: "Numbered List",
            contents: ["Item 1", "Item 2", "Item 3"],
            leftSpacing: 40,
            topSpacing: 0,
            bottomSpacing: 0,
            itemSpacing: 14,
            hovered: false
        }
        this.newArticle.articleContents.push(this.numberedListSection)
    }

    addFullWidthImageComponent() {
        this.fullWidthImageSection = {
            selector: "Full-Width Image",
            displayName: "Full-Width Image",
            image: null,
            src: null,
            name: null,
            placeholder: "images\\placeholder-image.jpg",
            width: 100,
            topSpacing: 0,
            bottomSpacing: 0,
            hovered: false
        }
        this.newArticle.articleContents.push(this.fullWidthImageSection)
    }

    /** Functions to check which component is in newArticle.articleContents */
    isTitleComponent(component): boolean {
        if(component.selector === "Title") {
            return true
        } else return false
    }

    isTextComponent(component): boolean {
        if(component.selector === "Text") {
            return true
        } else return false
    }

    isSubheaderComponent(component): boolean {
        if(component.selector === "Subheader") {
            return true
        } else return false
    }

    isBulletedListComponent(component): boolean {
        if(component.selector === "Bulleted List") {
            return true
        } else return false
    }

    isNumberedListComponent(component): boolean {
        if(component.selector === "Numbered List") {
            return true
        } else return false
    }

    isFullWidthImageComponent(component): boolean {
        if(component.selector === "Full-Width Image") {
            return true
        } else return false
    }
}
