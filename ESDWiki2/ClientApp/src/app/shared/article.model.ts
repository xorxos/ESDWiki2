export interface IArticle {
    id: number
    title: string
    description: string
    articleContents: any[]
    categoryTags: string[]
}

export interface ITitleSection {
    selector: string,
    displayName: string,
    contents: string,
    bottomSpacing: number,
    hovered: boolean
}

export interface ITextSection {
    selector: string,
    displayName: string,
    contents: string,
    leftSpacing: number,
    topSpacing: number,
    bottomSpacing: number,
    hovered: boolean
}

export interface IBulletedListSection {
    selector: string,
    displayName: string,
    contents: string[],
    leftSpacing: number,
    topSpacing: number,
    bottomSpacing: number,
    itemSpacing: number,
    hovered: boolean
}

export interface INumberedListSection {
    selector: string,
    displayName: string,
    contents: string[],
    leftSpacing: number,
    topSpacing: number,
    bottomSpacing: number,
    itemSpacing: number,
    hovered: boolean
}

export interface ISubheaderSection {
    selector: string,
    displayName: string,
    contents: string,
    leftSpacing: number,
    topSpacing: number,
    bottomSpacing: number,
    hovered: boolean
}

export interface IFullWidthImageSection {
    selector: string,
    image: any,
    name: string,
    displayName: string,
    src: any,
    width: number,
    placeholder: string,
    topSpacing: number,
    bottomSpacing: number,
    hovered: boolean
}