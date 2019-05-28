export class TeamCategory {
    id: number
    name: string
}

export class WikiCategory {
  id: number
  name: string
  categoryUrl: string  //category name with the spaces replaced with underscores. Ex.  Active Directory => active_directory
  imageUrl: string
  imagePlaceholder: string  //default image
  imageName: string //example.png
  imagePath: string //path in database to image
}

