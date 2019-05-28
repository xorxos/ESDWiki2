export class Article {
    id: number
    title: string
    description: string
    articleContents: any[]
    wikiCategories: string[]
    teamCategories: string[]
}

export class ArticleItem {
  selector: string
  displayName: string
  hovered: boolean
  bottomSpacing: number
}

export class BulletItem {
  content: string
  public constructor(
    fields?: {
      content?: string
    }) {
    if (fields) Object.assign(this, fields);
  }
}

export class TitleSection extends ArticleItem {
    contents: string
}

export class TextSection extends ArticleItem  {
    contents: string
    leftSpacing: number
    topSpacing: number
}

export class BulletedListSection extends ArticleItem  {
    contents: BulletItem[]
    leftSpacing: number
    topSpacing: number
    itemSpacing: number
}

export class NumberedListSection extends ArticleItem  {
    contents: BulletItem[]
    leftSpacing: number
    topSpacing: number
    itemSpacing: number
}

export class SubheaderSection extends ArticleItem  {
    contents: string
    leftSpacing: number
    topSpacing: number
}

export class FullWidthImageSection extends ArticleItem  {
    image: any
    name: string
    imageSrc: string
    width: number
    placeholder: string
    topSpacing: number
}
