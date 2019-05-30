
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './auth.guard';

import { ArticleCategoriesComponent } from './home/articlecategories.component'
import { CategoryListComponent } from './search/articles-by-category/category-articlelist.component'
import { TeamWikiComponent } from './team/team-wiki.component';
import { CreateArticleComponent } from './create/create-article.component';
import { UnauthorizedComponent } from './errors/unauthorized.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { CreateAccountComponent } from './admin/users/new/create-account.component';
import { EditAccountComponent } from './admin/users/edit/edit-account.component';
import { AccountPermissionsComponent } from './admin/users/permissions/permissions.component';
import { TeamCategoryAdminComponent } from './admin/team/categories/team-category-admin.component';
import { PublicCategoryAdminComponent } from './admin/wiki/wiki-category-admin.component';
import { SearchAccountComponent } from './admin/users/search/search-account.component';
import { ArticleDetailsComponent } from './article/article.details.component';

const appRoutes: Routes = [
  { path: 'browse', component: ArticleCategoriesComponent },
  { path: 'browse/:name', component: CategoryListComponent },
  { path: 'error/unauthorized', component: UnauthorizedComponent },
  { path: 'team-wiki/create', component: CreateArticleComponent, canActivate: [AuthGuard] },
  { path: 'team-wiki', component: TeamWikiComponent, canActivate: [AuthGuard] },
  { path: 'team-wiki/:id', component: ArticleDetailsComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/users/new', component: CreateAccountComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: SearchAccountComponent, canActivate: [AuthGuard] },
  { path: 'admin/users/edit', component: EditAccountComponent, canActivate: [AuthGuard] },
  { path: 'admin/users/permissions', component: AccountPermissionsComponent, canActivate: [AuthGuard] },
  { path: 'admin/team/categories', component: TeamCategoryAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/wiki/categories', component: PublicCategoryAdminComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/browse', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
