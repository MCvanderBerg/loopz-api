SELECT tickets.barcode, users.id as user_id, users.name, users.surname, users.username, users.email_address, users.phone_number FROM tickets
JOIN users on tickets.user_id = users.id
WHERE event_id = ?
