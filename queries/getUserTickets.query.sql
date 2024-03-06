SELECT tickets.barcode, events.id as event_id, events.name, events.email_address, events.phone_number, events.created_at, locations.* FROM tickets
JOIN events on tickets.event_id = events.id
JOIN locations on events.location_id = locations.id
WHERE user_id = ?
