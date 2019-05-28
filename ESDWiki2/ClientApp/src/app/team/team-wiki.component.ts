import { Component, OnInit } from '@angular/core'
import { ArticleService } from '../shared/article.service'
import { Article } from '../shared/article.model';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'team-wiki',
    templateUrl: './team-wiki.component.html',
    styleUrls: ['./team-wiki.component.css']
})
export class TeamWikiComponent implements OnInit {
    articleList:Article[]

  constructor(private ArticleService: ArticleService, private userService: UserService) {
    }

    ngOnInit(): void {
      this.articleList = this.ArticleService.getTeamArticleByCategory("Active Directory")

      // Need to set our Role subscriptions in case of page reload without re-login
      this.userService.isWikiAdmin();
      this.userService.isWikiUser();
      this.userService.isESDTeamAdmin();
      this.userService.isESDTeamMember();
    }
}
