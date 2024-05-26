class Event {
    constructor(
        id,
        name,
        description,
        date,
        location_id,
        created_at,
        phone_number,
        email_address,
        creator_id
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

module.exports = Event