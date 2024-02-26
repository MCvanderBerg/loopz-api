SELECT
    events.id, events.name, events.description, events.date, events.created_at, events.phone_number, events.email_address,
    locations.id as location_id, locations.name as location, locations.longitude as longitude, locations.latitude as latitude,
    users.id as user_id, users.username as user_username
FROM events
JOIN locations on locations.id = events.location_id
JOIN users on users.id = events.creator_id
WHERE events.name = ?