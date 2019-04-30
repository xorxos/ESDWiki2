
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './auth.guard';

import { ArticleCategoriesComponent } from './home/articlecategories.component'
import { CategoryListComponent } from './search/articles-by-category/category-articlelist.component'
import { TeamWikiComponent } from './team/team-wiki.component';
import { CreateArticleComponent } from './create/create-article.component';

const appRoutes: Routes = [
  { path: 'browse', component: ArticleCategoriesComponent },
  { path: 'browse/:name', component: CategoryListComponent },
  { path: 'team-wiki', component: TeamWikiComponent, canActivate: [AuthGuard] },
  { path: 'team-wiki/create', component: CreateArticleComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/browse', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
