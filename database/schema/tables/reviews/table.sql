-- airbnb.reviews definition

-- Drop table

-- DROP TABLE airbnb.reviews;

CREATE TABLE airbnb.reviews (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	property_id int4 NOT NULL,
	booking_id int4 NOT NULL,
	rating numeric(3, 2) NOT NULL,
	"comment" text NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT reviews_booking_id_key UNIQUE (booking_id),
	CONSTRAINT reviews_booking_id_not_null NOT NULL booking_id,
	CONSTRAINT reviews_created_at_not_null NOT NULL created_at,
	CONSTRAINT reviews_id_not_null NOT NULL id,
	CONSTRAINT reviews_pkey PRIMARY KEY (id),
	CONSTRAINT reviews_property_id_not_null NOT NULL property_id,
	CONSTRAINT reviews_rating_check CHECK (((rating >= (0)::numeric) AND (rating <= (5)::numeric))),
	CONSTRAINT reviews_rating_not_null NOT NULL rating,
	CONSTRAINT reviews_updated_at_not_null NOT NULL updated_at,
	CONSTRAINT reviews_user_id_not_null NOT NULL user_id
);
CREATE INDEX idx_reviews_property_id ON airbnb.reviews USING btree (property_id);


-- airbnb.reviews foreign keys

ALTER TABLE airbnb.reviews ADD CONSTRAINT reviews_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES airbnb.bookings(id);
ALTER TABLE airbnb.reviews ADD CONSTRAINT reviews_property_id_fkey FOREIGN KEY (property_id) REFERENCES airbnb.properties(id);
ALTER TABLE airbnb.reviews ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES airbnb.users(id);