import { Component, OnInit } from '@angular/core'
import { ArticleService } from '../shared/article.service'
import { IArticle } from '../shared/article.model';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'team-wiki',
    templateUrl: './team-wiki.component.html',
    styleUrls: ['./team-wiki.component.css']
})
export class TeamWikiComponent implements OnInit {
    articleList:IArticle[]

  constructor(private ArticleService: ArticleService, private userService: UserService) {
    }

    ngOnInit(): void {
      this.articleList = this.ArticleService.getTeamArticleByCategory("Active Directory")
      this.userService.isWikiAdmin()
    }
}
