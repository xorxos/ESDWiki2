import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'

import { ArticleAppComponent } from './article-app.component'
import { TopNavBarComponent } from './navbar/top-navbar.component';
import { ArticleCategoriesComponent } from './home/articlecategories.component';
import { CategoryListComponent } from './search/articles-by-category/category-articlelist.component'
import { CategoryService } from './shared/category.service'
import { ArticleService } from './shared/article.service'
import { routing } from './routes'
import { TeamWikiComponent } from './team/team-wiki.component';
import { CreateArticleComponent } from './create/create-article.component';
import { AddItemMenuComponent } from './create/menus/add-item-menu.component';
import { TitleSettingsMenuComponent } from './create/menus/article-component-menus/title-settings-menu.component';
import { ArticleSettingsMenuComponent } from './create/menus/article-settings-menu.component';
import { ArticleContentsMenuComponent } from './create/menus/article-contents-menu.component';
import { SubheaderSettingsMenuComponent } from './create/menus/article-component-menus/subheader-settings-menu.component';
import { TextSettingsMenuComponent } from './create/menus/article-component-menus/text-settings-menu.component';
import { BulletedListSettingsMenuComponent } from './create/menus/article-component-menus/bulletedlist-settings-menu.component';
import { NumberedListSettingsMenuComponent } from './create/menus/article-component-menus/numberedlist-settings-menu.component';
import { FullWidthImageSettingsMenuComponent } from './create/menus/article-component-menus/fullwidthimage-settings-menu.component';
import { SharedModule } from './shared/modules/shared.module';
import { AccountModule } from './account/account.module';
import { ConfigService } from './shared/utils/config.service';
import { XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { AuthGuard } from './auth.guard';
import { UnauthorizedComponent } from './errors/unauthorized.component';


@NgModule({
  declarations: [
    ArticleAppComponent,
    TopNavBarComponent,
    ArticleCategoriesComponent,
    CategoryListComponent,
    TeamWikiComponent,
    CreateArticleComponent,
    AddItemMenuComponent,
    TitleSettingsMenuComponent,
    ArticleSettingsMenuComponent,
    ArticleContentsMenuComponent,
    SubheaderSettingsMenuComponent,
    TextSettingsMenuComponent,
    BulletedListSettingsMenuComponent,
    NumberedListSettingsMenuComponent,
    FullWidthImageSettingsMenuComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AccountModule,
    routing
  ],
  providers: [ 
    CategoryService,
    ArticleService,
    AuthGuard,
    ConfigService, {
      provide: XHRBackend,
      useClass: AuthenticateXHRBackend
    }
  ],
  bootstrap: [ArticleAppComponent]
})
export class AppModule { }
