CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    is_complete BOOLEAN DEFAULT FALSE,
    first_name VARCHAR(255) DEFAULT NULL,
    last_name_p VARCHAR(255) DEFAULT NULL,
    last_name_m VARCHAR(255) DEFAULT NULL,
    birth_date DATE DEFAULT NULL,
    university VARCHAR(255) DEFAULT NULL,
    career VARCHAR(255) DEFAULT NULL
);

drop table users;