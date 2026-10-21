-- airbnb.images definition

-- Drop table

-- DROP TABLE airbnb.images;

CREATE TABLE airbnb.images (
	id serial4 NOT NULL,
	property_id int4 NOT NULL,
	url varchar(255) NOT NULL,
	category varchar(20) DEFAULT 'other'::character varying NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT images_category_check CHECK (((category)::text = ANY ((ARRAY['cover'::character varying, 'bedroom'::character varying, 'bathroom'::character varying, 'kitchen'::character varying, 'living_room'::character varying, 'exterior'::character varying, 'other'::character varying])::text[]))),
	CONSTRAINT images_category_not_null NOT NULL category,
	CONSTRAINT images_created_at_not_null NOT NULL created_at,
	CONSTRAINT images_id_not_null NOT NULL id,
	CONSTRAINT images_pkey PRIMARY KEY (id),
	CONSTRAINT images_property_id_not_null NOT NULL property_id,
	CONSTRAINT images_url_not_null NOT NULL url
);
CREATE INDEX idx_images_property_id ON airbnb.images USING btree (property_id);


-- airbnb.images foreign keys

ALTER TABLE airbnb.images ADD CONSTRAINT images_property_id_fkey FOREIGN KEY (property_id) REFERENCES airbnb.properties(id);