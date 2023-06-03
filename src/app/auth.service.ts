import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { User } from "./entity/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    constructor(private httpClient: HttpClient,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isUserLoggedIn()) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }

    isUserLoggedIn() {
        let user = JSON.parse(sessionStorage.getItem('user')!);
        return !(user === null);
    }

    logOut() {
        sessionStorage.removeItem('user');
        this.router.navigate(['']);
    }

    static getCurrentUser(): User {
        return new User(JSON.parse(sessionStorage.getItem('user')!));
    }

    static getJwtHeaderJSON() {
        return { headers: { 'Content-Type': 'application/json' } };
    }
}