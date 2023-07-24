import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProfilePage } from '../profile/profile.page';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  // {
  //   path: 'tab2',
  //   component: Tab2Page,
  //   children: [
  //     {
  //       path: 'profile',
  //       loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
  //     },
  //   ]
  // },
  // {
  //   path: 'profile',
  //   component: ProfilePage,
  // },
  {
    path: '',
    component: Tab2Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
