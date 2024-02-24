
export interface IEvent {
    id: number
    name: string
    description: string
    date: Date
    location_id: number
    created_at: Date
    phone_number: string
    email_address: string
    creator_id: number
}

export class Event implements IEvent {
    readonly id: number
    readonly name: string
    readonly description: string
    readonly date: Date
    readonly location_id: number
    readonly created_at: Date
    readonly phone_number: string
    readonly email_address: string
    readonly  creator_id: number

    constructor(
        id: number,
        name: string,
        description: string,
        date: Date,
        location_id: number,
        created_at: Date,
        phone_number: string,
        email_address: string,
        creator_id:number
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.date = date
        this.location_id = location_id
        this.created_at = created_at
        this.phone_number = phone_number
        this.email_address = email_address
        this.creator_id = creator_id
    }
}