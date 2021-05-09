import {Routes, RouterModule} from "@angular/router";
import { ActivityComponent } from "./activity/activity.component";
import { AppComponent } from './app.component';
import { LoginComponent} from './auth/login/login.component';
import { RegcompanyComponent } from "./auth/register/regcompany/regcompany.component";
import { ReghackerComponent } from "./auth/register/reghacker/reghacker.component";
import { RegisterComponent} from './auth/register/register.component'
import { ProgramComponent } from "./company/program/program/program.component";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { DirectoryComponent } from "./directory/directory.component";
import { ErrorComponent } from "./error/error.component";
import { LoginGuard } from "./guards/login.guard";
import { LogoutGuard } from "./guards/logout.guard";
import { RoleGuard } from "./guards/role.guard";
import { HacktivityComponent } from "./hacktivity/hacktivity.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { SpecificProgramComponent } from "./specific-program/specific-program.component";
import { SupportComponent } from "./support/support.component";

const APP_ROUTES : Routes = [
    {path: '', component: HomeComponent},
    {path: 'directory',component: DirectoryComponent},
    {path: 'hacktivity',component: HacktivityComponent},
    {path: 'login', component: LoginComponent, canActivate: [LogoutGuard]},
    {path: 'dashboard',component: DashboardComponent, canActivate: [LoginGuard]},
    {path: 'error', component: ErrorComponent},
    {path : 'profile' , component: ProfileComponent, canActivate: [LoginGuard]},
    {path: 'program', children: [
        {path: '',component: ProgramComponent, canActivate: [LoginGuard,RoleGuard],data:{expectedRole: 'company'}},
        {path: ':id',component:SpecificProgramComponent}
    ]},
    {path: 'support', component: SupportComponent},
    {path: 'activity', component: ActivityComponent},
    {path: 'register', children:[
        {path: '', component: RegisterComponent},
        {path: 'hacker', component: ReghackerComponent},
        {path: 'company', component: RegcompanyComponent},
    ], canActivate: [LogoutGuard]}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
