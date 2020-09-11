import {BaseUser} from "../../shared/dto/baseUser";

export class Match {
    id: number;
    owner: BaseUser;
    title: string;
    startDate: Date;
    location: string;
    numberOfPlayers: number;
    description: string;
    participants: BaseUser[];

    constructor() {}
}
