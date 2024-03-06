SELECT users.id as user_id, users.name, users.surname, users.username, users.email_address, users.phone_number FROM watchers
JOIN users on watchers.user_id = users.id
WHERE event_id = ?
