import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about_us/about-us.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProjectsComponent } from './projects/projects.component';
import { SettingsComponent } from './settings/settings.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';

export const routes: Routes = [
    {
        path:"Home",
        component: HomeComponent
    },
    {
        path:"About_us",
        component: AboutUsComponent
    },
    {
        path:"Log_in",
        component: LogInComponent
    },
    {
        path:"Projects",
        component: ProjectsComponent
    },
    {
        path:"Log_in_form",
        component: LogInFormComponent

    },
    {
        path:"Settings",
        component: SettingsComponent
    },
];
