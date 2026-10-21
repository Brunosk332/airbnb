-- airbnb.properties definition

-- Drop table

-- DROP TABLE airbnb.properties;

CREATE TABLE airbnb.properties (
	id serial4 NOT NULL,
	"type" varchar(30) NOT NULL,
	"location" varchar(100) NOT NULL,
	price_per_night numeric(10, 2) NOT NULL,
	rating numeric(3, 2) DEFAULT 0 NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	host_id int4 NOT NULL,
	allows_pets bool DEFAULT false NOT NULL,
	max_guests int4 DEFAULT 1 NOT NULL,
	bedrooms int4 DEFAULT 1 NOT NULL,
	bathrooms int4 DEFAULT 1 NOT NULL,
	has_wifi bool DEFAULT false NOT NULL,
	has_parking bool DEFAULT false NOT NULL,
	description text NULL,
	beds int4 DEFAULT 1 NOT NULL,
	CONSTRAINT no_duplicate_properties EXCLUDE USING gist (host_id WITH =, description WITH =, tsrange(created_at, (created_at + '00:01:00'::interval)) WITH &&),
	CONSTRAINT properties_allows_pets_not_null NOT NULL allows_pets,
	CONSTRAINT properties_bathrooms_not_null NOT NULL bathrooms,
	CONSTRAINT properties_bedrooms_not_null NOT NULL bedrooms,
	CONSTRAINT properties_beds_not_null NOT NULL beds,
	CONSTRAINT properties_created_at_not_null NOT NULL created_at,
	CONSTRAINT properties_has_parking_not_null NOT NULL has_parking,
	CONSTRAINT properties_has_wifi_not_null NOT NULL has_wifi,
	CONSTRAINT properties_host_id_not_null NOT NULL host_id,
	CONSTRAINT properties_id_not_null NOT NULL id,
	CONSTRAINT properties_location_not_null NOT NULL location,
	CONSTRAINT properties_max_guests_not_null NOT NULL max_guests,
	CONSTRAINT properties_pkey PRIMARY KEY (id),
	CONSTRAINT properties_price_per_night_not_null NOT NULL price_per_night,
	CONSTRAINT properties_rating_check CHECK (((rating >= (0)::numeric) AND (rating <= (5)::numeric))),
	CONSTRAINT properties_type_not_null NOT NULL type,
	CONSTRAINT properties_updated_at_not_null NOT NULL updated_at
);
CREATE INDEX idx_properties_host_id ON airbnb.properties USING btree (host_id);
CREATE INDEX idx_properties_location ON airbnb.properties USING btree (location);
CREATE INDEX no_duplicate_properties ON airbnb.properties USING gist (host_id, description, tsrange(created_at, (created_at + '00:01:00'::interval)));


-- airbnb.properties foreign keys

ALTER TABLE airbnb.properties ADD CONSTRAINT properties_host_id_fkey FOREIGN KEY (host_id) REFERENCES airbnb.users(id);