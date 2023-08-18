import { Injectable } from "@angular/core";
import { TokenService } from "../services/token.service";

@Injectable({
    providedIn: "root"
})

export class Globals {

    constructor(private tokenService: TokenService) {}

    user = this.tokenService.user();

    firstName = this.user.firstName
    lastName = this.user.lastName
    email = this.user.email
    lastLogin = this.user.lastLogin
    status = this.user.status
    roles = this.user.roles
}