import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { CustomerComponent } from './customer/customer.component';

export const routes: Routes = [
    {path: "login", component:LoginComponent},
    {path: "home", component:HomeComponent},
    {path: "register", component:RegisterComponent},
    {path: "about-us", component:AboutUsComponent},
    {path: "insurance", component:InsuranceComponent},
    {path: "", component:CustomerComponent}
];
