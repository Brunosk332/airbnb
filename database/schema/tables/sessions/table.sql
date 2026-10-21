-- airbnb.sessions definition

-- Drop table

-- DROP TABLE airbnb.sessions;

CREATE TABLE airbnb.sessions (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	session_token varchar(255) NOT NULL,
	created_at timestamp DEFAULT now() NULL,
	expires_at timestamp NOT NULL,
	CONSTRAINT sessions_expires_at_not_null NOT NULL expires_at,
	CONSTRAINT sessions_id_not_null NOT NULL id,
	CONSTRAINT sessions_pkey PRIMARY KEY (id),
	CONSTRAINT sessions_session_token_key UNIQUE (session_token),
	CONSTRAINT sessions_session_token_not_null NOT NULL session_token,
	CONSTRAINT sessions_user_id_not_null NOT NULL user_id
);


-- airbnb.sessions foreign keys

ALTER TABLE airbnb.sessions ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES airbnb.users(id);