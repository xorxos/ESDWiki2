import { WikiCategory, TeamCategory } from "./category.model";

export class Article {
  id: number
  title: string
  description: string
  articleItems: ArticleItem[]
  wikiCategories: WikiCategory[]
  teamCategories: TeamCategory[]
}

export class ArticleItem {
  selector: string
  displayName: string
  hovered: boolean
  topSpacing: number
  bottomSpacing: number
  leftSpacing: number
  itemSpacing: number
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

export class TextSection extends ArticleItem {
  contents: string
}

export class ListSection extends ArticleItem {
  contents: BulletItem[]
}

export class SubheaderSection extends ArticleItem {
  contents: string
}

export class FullWidthImageSection extends ArticleItem {
  image: any
  name: string
  imageSrc: string
  width: number
  placeholder: string
}
