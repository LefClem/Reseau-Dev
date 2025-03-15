import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthServices } from "../services/auth.services";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router
    ){}
        
    public canActivate(): boolean {
        const token = localStorage.getItem("token");
        if(!token){
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }

}