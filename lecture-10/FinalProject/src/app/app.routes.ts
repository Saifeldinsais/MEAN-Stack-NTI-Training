import { Routes } from '@angular/router';
import { Home } from './home/home';
import { TaskList } from './tasks/task-list/task-list';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { NotFound } from './not-found/not-found';
import { TaskForm } from './tasks/task-form/task-form';
import { TaskDetail } from './tasks/task-detail/task-detail';
import { User } from './user/user';
import { UserDashboard } from './user/user-dashboard/user-dashboard';
import { authGuard } from './guards/auth-guard';
import { userChildGuard } from './guards/user-child-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';
import { UserDetails } from './user/user-details/user-details';

export const routes: Routes = [

    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: Home, title: "Home" },
    { path: "about", component: About, title: "About Us" },
    { path: "contact", component: Contact, title: "Contact us" },
    { path: "login", component: Login, title: "Login" },
    { path: "signup", component: Signup, title: "Sign Up" },
    { path: "tasks/:id", component: TaskDetail, title: "Task Details" },
    {
        path: "user", component: User, title: "User",
        canActivate: [authGuard],
        canActivateChild: [userChildGuard],
        children: [
            { path: "", redirectTo: "tasklist", pathMatch: "full" },
            { path: "dashboard", component: UserDashboard, title: "User Dashboard" },
            { path: "tasklist", component: TaskList, title: "Your Task List" },
            { path: "taskform", component: TaskForm, title: "Add Task", canDeactivate: [unsavedChangesGuard] },
            {path: "userDetails", component: UserDetails, title: "Your Accout"}
        ]
    },




    { path: "**", component: NotFound, title: "Not Found" },

];