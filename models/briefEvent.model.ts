import {IEvent} from "./event.model";
import {IUser} from "./user.model";

type PickedIEvent = Pick<IEvent, 'id'| 'name' | 'date' | 'location_id'>
type PickedIUser = Pick<IUser, 'username'>

export interface IBriefEvent extends PickedIEvent, PickedIUser{}
export class briefEvent implements IBriefEvent {
    readonly id: number
    readonly name: string
    readonly date: Date
    readonly location_id: number
    readonly username: string

    constructor(
        id: number,
        name: string,
        date: Date,
        location_id: number,
        username: string,
    ) {
        this.id = id
        this.name = name
        this.date = date
        this.location_id = location_id
        this.username = username
    }
}