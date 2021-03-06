import { Component, OnInit } from '@angular/core'
import {
  Article,
  BulletItem,
  ArticleItem
} from '../shared/article.model';

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
  sectionIndex: number

  /** Variables used when updating list objects such as bulleted lists and numbered lists */
  selectedBulletedList

  newArticle: Article
  titleSection: ArticleItem
  textSection: ArticleItem
  subheaderSection: ArticleItem
  fullWidthImageSection: ArticleItem
  bulletedListSection: ArticleItem
  numberedListSection: ArticleItem

  ngOnInit() {
    /** Setting the initial boolean values to dictate which menu to show */
    this.setMenuBooleansFalse()
    this.showArticleContents = true
    this.titleSection = {
      selector: "Title",
      displayName: "Title",
      position: 0,
      titleContents: "This is a Title",
      bottomSpacing: 0,
      topSpacing: 0,
      leftSpacing: 0,
      itemSpacing: 0,
      hovered: false,
      textContents: null,
      listContents: null,
      subheaderContents: null,
      name: null,
      imageSrc: null,
      width: 0,
      placeholder: null
    }
    this.newArticle = {
      id: 20,
      description: "",
      articleItems: [this.titleSection],
      title: this.titleSection.titleContents.toString(),
      wikiCategories: [],
      teamCategories: []
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
    this.newArticle.articleItems[this.sectionIndex].displayName = event.target.value
  }

  /** Functions to re-arrange newArticle.articleContents */
  moveComponentUp(index) {
    var oldIndex = index
    var newIndex = index - 1
    var item = this.newArticle.articleItems[oldIndex]
    if (newIndex > 0) {
      // Move component to new position
      item.position = newIndex;
      // Move the replaced item to new position
      this.newArticle.articleItems[newIndex].position = oldIndex;
      this.newArticle.articleItems.splice(oldIndex, 1)
      this.newArticle.articleItems.splice(newIndex, 0, item)
    }
  }

  moveComponentDown(index) {
    var oldIndex = index
    var newIndex = index + 1
    var item = this.newArticle.articleItems[oldIndex]
    if (newIndex <= this.newArticle.articleItems.length) {
      // Move component to new position
      item.position = newIndex;
      // Move the replaced item to new position
      this.newArticle.articleItems[newIndex].position = oldIndex;
      this.newArticle.articleItems.splice(oldIndex, 1)
      this.newArticle.articleItems.splice(newIndex, 0, item)
    }
  }

  /** Function to highlight the hovered component */
  highlightComponent(index) {
    /** Remove all existing highlights */
    for (let i = 0; i < this.newArticle.articleItems.length; i++) {
      this.newArticle.articleItems[i].hovered = false
    }

    /** Highlight the new hovered component */
    this.newArticle.articleItems[index].hovered = true
  }

  dehighlightComponent(index) {
    this.newArticle.articleItems[index].hovered = false
  }

  /** Functions To Update Component Spacing */
  updateLeftSpacing(event) {
    try {
      this.newArticle.articleItems[this.sectionIndex].leftSpacing = event.target.value
    } catch (e) {
      console.log('could not set left spacing value')
    }
  }

  updateTopSpacing(event) {
    try {
      this.newArticle.articleItems[this.sectionIndex].topSpacing = event.target.value
    } catch (e) {
      console.log('could not set top spacing value')
    }
  }

  updateBottomSpacing(event) {
    try {
      this.newArticle.articleItems[this.sectionIndex].bottomSpacing = event.target.value
    } catch (e) {
      console.log('could not set bottom spacing value')
    }
  }

  updateItemSpacing(event) {
    try {
      this.newArticle.articleItems[this.sectionIndex].itemSpacing = event.target.value
    } catch (e) {
      console.log('could not set item spacing value')
    }
  }

  /** Update Title Component Functions */
  updateTitleContent(event) {
    try {
      var titleSection = this.newArticle.articleItems[this.sectionIndex]
      titleSection.titleContents = event.target.value
      this.newArticle.articleItems[this.sectionIndex] = titleSection
    } catch (e) {
      console.log('could not set text-area value')
      console.log(e)
    }
  }

  // Update article description
  updateDescription(event) {
    this.newArticle.description = event.target.value
  }

  /** Update Subheader Component Functions */
  updateSubheaderContent(event) {
    try {
      var subheaderSection = this.newArticle.articleItems[this.sectionIndex]
      subheaderSection.subheaderContents = event.target.value
      this.newArticle.articleItems[this.sectionIndex] = subheaderSection
    } catch (e) {
      console.log('could not set text-area value')
    }
  }

  /** Update Text Component Functions */
  updateTextContent(event) {
    try {
      var richTextSection = this.newArticle.articleItems[this.sectionIndex]
      richTextSection.textContents = event.target.value
      this.newArticle.articleItems[this.sectionIndex] = richTextSection
    } catch (e) {
      console.log('could not set text-area value')
    }
  }

  /** Update BulletedList & NumberedList Component Functions */
  updateBulletedListContent(event) {
    console.log("Updating Bullets")
    try {
      var bulletedListSection = this.newArticle.articleItems[this.sectionIndex]
      bulletedListSection.listContents[event.index].bulletContents = event.event.target.value
      this.newArticle.articleItems[this.sectionIndex] = bulletedListSection
    } catch (e) {
      console.log('could not set text-area value')
    }
  }

  updateNumberedListContent(event) {
    console.log("Updating Numbered")
    try {
      var numberedListSection = this.newArticle.articleItems[this.sectionIndex]
      numberedListSection.listContents[event.index].bulletContents = event.event.target.value
      this.newArticle.articleItems[this.sectionIndex] = numberedListSection
    } catch (e) {
      console.log('could not set text-area value')
    }
  }

  deleteListItem(index) {
    if (index !== -1) {
      (this.newArticle.articleItems[this.sectionIndex]).listContents.splice(index, 1)
      var tempIndex: number = 0
      for (var listItem of this.newArticle.articleItems[this.sectionIndex].listContents) {
        if (tempIndex === listItem.position) {
          tempIndex = tempIndex + 1
          continue
        } else {
          (this.newArticle.articleItems[this.sectionIndex]).listContents[tempIndex].position = tempIndex
          tempIndex = tempIndex + 1
        }
      }
    }
  }

  createListItem() {
    (this.newArticle.articleItems[this.sectionIndex]).listContents.push(new BulletItem({ bulletContents: "New Item", position: this.newArticle.articleItems[this.sectionIndex].listContents.length }))
  }

  /** Functions to update and get images */
  updateFullWidthImageSrc(src) {
    (this.newArticle.articleItems[this.sectionIndex]).imageSrc = src
  }

  updateFullWidthImageName(name: string) {
    (this.newArticle.articleItems[this.sectionIndex]).name = name
  }

  rangeChange(event: number) {
    (this.newArticle.articleItems[this.sectionIndex]).width = event
  }

  /** Function to remove component */
  deleteComponent(index: number) {
    if (index !== -1) {
      this.newArticle.articleItems.splice(index, 1)
    }
  }

  /** Functions to add components */
  addArticleItem(event) {
    if (event === "Text") {
      this.addTextComponent()
    } else if (event === "Subheader") {
      this.addSubheaderComponent()
    } else if (event === "Bulleted List") {
      this.addBulletedListComponent()
    } else if (event === "Numbered List") {
      this.addNumberedListComponent()
    } else if (event === "FullWidth Image") {
      this.addFullWidthImageComponent()
    }
    this.toggleConfigurationSection(true)
  }

  addTextComponent() {
    this.textSection = {
      selector: "Text",
      displayName: "Text",
      position: this.newArticle.articleItems.length,
      textContents: "This is some text. Extra spaces and returns are shown exactly as entered.",
      leftSpacing: 0,
      topSpacing: 0,
      bottomSpacing: 0,
      itemSpacing: 0,
      hovered: false,
      titleContents: null,
      listContents: null,
      subheaderContents: null,
      name: null,
      imageSrc: null,
      width: 0,
      placeholder: null
    }
    console.log(this.newArticle.articleItems.length)
    this.newArticle.articleItems.push(this.textSection)
  }

  addSubheaderComponent() {
    this.subheaderSection = {
      selector: "Subheader",
      displayName: "Subheader",
      position: this.newArticle.articleItems.length,
      subheaderContents: "Step 1",
      leftSpacing: 0,
      topSpacing: 0,
      bottomSpacing: 0,
      itemSpacing: 0,
      hovered: false,
      textContents: null,
      listContents: null,
      titleContents: null,
      name: null,
      imageSrc: null,
      width: 0,
      placeholder: null
    }
    console.log(this.newArticle.articleItems.length)
    this.newArticle.articleItems.push(this.subheaderSection)
  }

  addBulletedListComponent() {
    this.bulletedListSection = {
      selector: "Bulleted List",
      displayName: "Bulleted List",
      position: this.newArticle.articleItems.length,
      listContents: [new BulletItem({ bulletContents: "Item 1", position: 0 }), new BulletItem({ bulletContents: "Item 2", position: 1 }), new BulletItem({ bulletContents: "Item 3", position: 2 })],
      leftSpacing: 40,
      topSpacing: 0,
      bottomSpacing: 0,
      itemSpacing: 14,
      hovered: false,
      textContents: null,
      titleContents: null,
      subheaderContents: null,
      name: null,
      imageSrc: null,
      width: 0,
      placeholder: null
    }
    console.log(this.newArticle.articleItems.length)
    this.newArticle.articleItems.push(this.bulletedListSection)
  }

  addNumberedListComponent() {
    this.numberedListSection = {
      selector: "Numbered List",
      displayName: "Numbered List",
      position: this.newArticle.articleItems.length,
      listContents: [new BulletItem({ bulletContents: "Item 1", position: 0 }), new BulletItem({ bulletContents: "Item 2", position: 1 }), new BulletItem({ bulletContents: "Item 3", position: 2 })],
      leftSpacing: 40,
      topSpacing: 0,
      bottomSpacing: 0,
      itemSpacing: 14,
      hovered: false,
      textContents: null,
      titleContents: null,
      subheaderContents: null,
      name: null,
      imageSrc: null,
      width: 0,
      placeholder: null
    }
    console.log(this.newArticle.articleItems.length)
    this.newArticle.articleItems.push(this.numberedListSection)
  }

  addFullWidthImageComponent() {
    this.fullWidthImageSection = {
      selector: "Full-Width Image",
      displayName: "Full-Width Image",
      position: this.newArticle.articleItems.length,
      imageSrc: null,
      name: null,
      placeholder: "images\\placeholder-image.jpg",
      width: 100,
      topSpacing: 0,
      bottomSpacing: 0,
      leftSpacing: 0,
      itemSpacing: 0,
      hovered: false,
      textContents: null,
      listContents: null,
      subheaderContents: null,
      titleContents: null
    }
    console.log(this.newArticle.articleItems.length)
    this.newArticle.articleItems.push(this.fullWidthImageSection)
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

  isFullWidthImageComponent(component): boolean {
    if (component.selector === "Full-Width Image") {
      return true
    } else return false
  }
}
