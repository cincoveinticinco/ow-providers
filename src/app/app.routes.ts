import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { FormsHomeComponent } from './pages/forms-home/forms-home.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { VinculationFormComponent } from './pages/vinculation-form/vinculation-form.component';
import { DocumentationFormComponent } from './pages/documentation-form/documentation-form.component';

export const routes: Routes = [
  {
    path: 'home/:id',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'request/:serviceTypeId',
        component: HomeComponent,
      }
    ]
  },
  {
    path: 'complete-form/:id',
    canActivate: [authGuard],
    component: FormsHomeComponent
  },
  {
    path: 'vinculation/:id/request/:serviceTypeId',
    canActivate: [authGuard],
    component: VinculationFormComponent
  },
  {
    path: 'documents/:id/request/:serviceTypeId',
    canActivate: [authGuard],
    component: DocumentationFormComponent,
  },
  {
    path: 'thanks/:id',
    canActivate: [authGuard],
    component: ThanksComponent,
    data: {
      type: 'initial'
    }
  },
  {
    path: 'thanks-docs/:id',
    canActivate: [authGuard],
    component: ThanksComponent,
    data: {
      type: 'docs'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];
