import {BaseUser} from "../../shared/dto/baseUser";

export class Match {
    id: number;
    owner: BaseUser;
    title: string;
    startDate: string;
    location: string;
    numberOfPlayers: number;
    description: string;
    participants: BaseUser[];

    constructor() {}
}
