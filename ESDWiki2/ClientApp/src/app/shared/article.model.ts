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
  titleContents: string
  textContents: string
  listContents: BulletItem[]
  subheaderContents: string
  name: string
  imageSrc: string
  width: number
  placeholder: string
}

export class BulletItem {
  bulletContents: string
  public constructor(
    fields?: {
      bulletContents?: string
    }) {
    if (fields) Object.assign(this, fields);
  }
}
