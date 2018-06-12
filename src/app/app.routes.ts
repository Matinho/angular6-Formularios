import { Routes, RouterModule } from '@angular/router';

import { DataComponent } from '../app/components/data/data.component';
import { TemplateComponent } from '../app/components/template/template.component';


const APP_ROUTES: Routes = [
    { path: '', component: DataComponent },
    { path: 'data', component: DataComponent },
    { path: 'template', component: TemplateComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'data' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
