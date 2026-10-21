-- airbnb.bookings definition

-- Drop table

-- DROP TABLE airbnb.bookings;

CREATE TABLE airbnb.bookings (
	id serial4 NOT NULL,
	guest_id int4 NOT NULL,
	property_id int4 NOT NULL,
	check_in date NOT NULL,
	check_out date NOT NULL,
	guests int4 DEFAULT 1 NOT NULL,
	total_price numeric(10, 2) NOT NULL,
	status varchar(20) DEFAULT 'pending'::character varying NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	payment_method airbnb."payment_method_type" NULL,
	CONSTRAINT bookings_check CHECK ((check_out > check_in)),
	CONSTRAINT bookings_check_in_not_null NOT NULL check_in,
	CONSTRAINT bookings_check_out_not_null NOT NULL check_out,
	CONSTRAINT bookings_created_at_not_null NOT NULL created_at,
	CONSTRAINT bookings_guests_not_null NOT NULL guests,
	CONSTRAINT bookings_id_not_null NOT NULL id,
	CONSTRAINT bookings_pkey PRIMARY KEY (id),
	CONSTRAINT bookings_property_id_not_null NOT NULL property_id,
	CONSTRAINT bookings_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying, 'cancelled'::character varying])::text[]))),
	CONSTRAINT bookings_status_not_null NOT NULL status,
	CONSTRAINT bookings_total_price_not_null NOT NULL total_price,
	CONSTRAINT bookings_updated_at_not_null NOT NULL updated_at,
	CONSTRAINT bookings_user_id_not_null NOT NULL guest_id,
	CONSTRAINT no_overlapping_bookings EXCLUDE USING gist (property_id WITH =, daterange(check_in, check_out) WITH &&) WHERE (((status)::text = 'confirmed'::text))
);
CREATE INDEX idx_bookings_property_id ON airbnb.bookings USING btree (property_id);
CREATE INDEX idx_bookings_user_id ON airbnb.bookings USING btree (guest_id);
CREATE INDEX no_overlapping_bookings ON airbnb.bookings USING gist (property_id, daterange(check_in, check_out)) WHERE ((status)::text = 'confirmed'::text);


-- airbnb.bookings foreign keys

ALTER TABLE airbnb.bookings ADD CONSTRAINT bookings_property_id_fkey FOREIGN KEY (property_id) REFERENCES airbnb.properties(id);
ALTER TABLE airbnb.bookings ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (guest_id) REFERENCES airbnb.users(id);