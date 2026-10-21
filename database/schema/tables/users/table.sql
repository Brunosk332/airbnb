-- airbnb.users definition

-- Drop table

-- DROP TABLE airbnb.users;

CREATE TABLE airbnb.users (
	id serial4 NOT NULL,
	"name" varchar(50) NOT NULL,
	email varchar(150) NOT NULL,
	password_hash varchar(255) NOT NULL,
	avatar_url varchar(255) NULL,
	is_host bool DEFAULT false NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT users_created_at_not_null NOT NULL created_at,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_email_not_null NOT NULL email,
	CONSTRAINT users_id_not_null NOT NULL id,
	CONSTRAINT users_is_host_not_null NOT NULL is_host,
	CONSTRAINT users_name_not_null NOT NULL name,
	CONSTRAINT users_password_hash_not_null NOT NULL password_hash,
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_updated_at_not_null NOT NULL updated_at
);