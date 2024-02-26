

export interface ILocation {
    id?:number
    longitude: number,
    latitude: number,
    name: string,
    address: string
}

export  class Location implements ILocation {
    readonly  id?: number
    readonly  longitude: number
    readonly  latitude: number
    readonly  name: string
    readonly address: string

    constructor(
        longitude: number,
        latitude: number,
        name: string,
        address: string
    ) {
        this.longitude = longitude
        this.latitude = latitude
        this.name = name
        this.address = address
    }
}