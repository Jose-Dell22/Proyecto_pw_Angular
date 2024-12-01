import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about_us/about-us.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProjectsComponent } from './projects/projects.component';
import { SettingsComponent } from './settings/settings.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
    },
    {
        path: 'Home',
        component: HomeComponent
    },
    {
        path: 'About_us',
        component: AboutUsComponent
    },
    {
        path: 'Log_in',
        component: LogInComponent
    },
    {
        path: 'Projects',
        component: ProjectsComponent,
        canActivate: [AuthGuard]
    },
    { path: 'log-in-form', component: LogInFormComponent },
    {
        path: 'Settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
    }
];