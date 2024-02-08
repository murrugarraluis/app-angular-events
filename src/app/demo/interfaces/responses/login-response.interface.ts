import {User} from "../models/user.interface";

export interface LoginResponse {
    data: User;
    token: string;
}
