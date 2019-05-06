
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './auth.guard';

import { ArticleCategoriesComponent } from './home/articlecategories.component'
import { CategoryListComponent } from './search/articles-by-category/category-articlelist.component'
import { TeamWikiComponent } from './team/team-wiki.component';
import { CreateArticleComponent } from './create/create-article.component';
import { UnauthorizedComponent } from './errors/unauthorized.component';

const appRoutes: Routes = [
  { path: 'browse', component: ArticleCategoriesComponent },
  { path: 'browse/:name', component: CategoryListComponent },
  { path: 'error/unauthorized', component: UnauthorizedComponent },
  { path: 'team-wiki/create', component: CreateArticleComponent, canActivate: [AuthGuard] },
  { path: 'team-wiki', component: TeamWikiComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/browse', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
