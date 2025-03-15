import { User } from "./User.interface";

export interface Commentary {
    id: number, 
    content: string,
    user: User
}