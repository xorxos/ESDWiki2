import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article, ArticleItem } from '../../../shared/article.model';

@Component({
  selector: 'fullwidthimage-settings-menu',
  templateUrl: './fullwidthimage-settings-menu.component.html',
  styleUrls: ['./shared-settings-styles.component.css']
})
export class FullWidthImageSettingsMenuComponent implements OnInit {
  @Input() newArticle: Article
  @Input() sectionIndex: number
  @Output() closeFullWidthImageSettingsMenuMessage = new EventEmitter<boolean>()
  @Output() updateFullWidthImageContentMessage = new EventEmitter<File>()
  @Output() updateFullWidthImageSrcMessage = new EventEmitter<any>()
  @Output() updateFullWidthImageNameMessage = new EventEmitter<string>()
  @Output() updateTopSpacingMessage = new EventEmitter<Input>()
  @Output() updateDisplayNameMessage = new EventEmitter<Input>()
  @Output() updateBottomSpacingMessage = new EventEmitter<Input>()
  @Output() updateFullWidthImageWidthMessage = new EventEmitter<number>()
  @Output() deleteComponentMessage = new EventEmitter<number>()

  fullWidthImage: ArticleItem

  @ViewChild('labelImport')
  labelImport: ElementRef
  @ViewChild('imagePreview')
  imagePreview: ElementRef

  formImport: FormGroup
  imgSrc: any

  constructor() {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    })
  }


  public imagePath;
  public message: string;

  ngOnInit() {
    this.getFullWidthImage()
  }

  onFileChange(files) {

    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgSrc = reader.result;

      this.updateFullWidthImageSrc(this.imgSrc)
    }

    this.labelImport.nativeElement.innerText = files.item(0).name
    this.updateFullWidthImageName(files.item(0).name)
    this.updateFullWidthImageContent(this.imagePath)
  }

  onRangeChange(event) {
    this.updateFullWidthImageWidthMessage.emit(event.target.value)
  }

  closeFullWidthImageSettingsMenu() {
    this.closeFullWidthImageSettingsMenuMessage.emit(true)
  }

  updateDisplayName(event: Input) {
    this.updateDisplayNameMessage.emit(event)
  }

  updateFullWidthImageContent(file: File) {
    this.updateFullWidthImageContentMessage.emit(file)
  }

  updateFullWidthImageSrc(src: any) {
    this.updateFullWidthImageSrcMessage.emit(src)
  }

  updateFullWidthImageName(name: string) {
    this.updateFullWidthImageNameMessage.emit(name)
  }

  updateTopSpacing(event: Input) {
    this.updateTopSpacingMessage.emit(event)
  }

  updateBottomSpacing(event: Input) {
    this.updateBottomSpacingMessage.emit(event)
  }

  getFullWidthImage() {
    this.fullWidthImage = this.newArticle.articleItems[this.sectionIndex]
    this.imgSrc = this.newArticle.articleItems[this.sectionIndex].imageSrc
  }

  deleteComponent() {
    this.deleteComponentMessage.emit(this.sectionIndex)
    this.closeFullWidthImageSettingsMenuMessage.emit(true)
  }
}
