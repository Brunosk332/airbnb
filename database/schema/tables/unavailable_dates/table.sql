-- airbnb.unavailable_dates definition

-- Drop table

-- DROP TABLE airbnb.unavailable_dates;

CREATE TABLE airbnb.unavailable_dates (
	id serial4 NOT NULL,
	property_id int4 NOT NULL,
	start_date date NOT NULL,
	end_date date NOT NULL,
	reason text NULL,
	created_at timestamp DEFAULT now() NULL,
	CONSTRAINT unavailable_dates_end_date_not_null NOT NULL end_date,
	CONSTRAINT unavailable_dates_id_not_null NOT NULL id,
	CONSTRAINT unavailable_dates_pkey PRIMARY KEY (id),
	CONSTRAINT unavailable_dates_property_id_not_null NOT NULL property_id,
	CONSTRAINT unavailable_dates_property_id_start_date_end_date_key UNIQUE (property_id, start_date, end_date),
	CONSTRAINT unavailable_dates_start_date_not_null NOT NULL start_date
);


-- airbnb.unavailable_dates foreign keys

ALTER TABLE airbnb.unavailable_dates ADD CONSTRAINT unavailable_dates_property_id_fkey FOREIGN KEY (property_id) REFERENCES airbnb.properties(id);