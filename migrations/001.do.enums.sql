CREATE TYPE link_type AS ENUM (
  'url',
  'google_maps'
);

CREATE TYPE limit_type AS ENUM (
  'geo_circle',
  'polygon',
  'dependent_locality',
  'city_or_locality',
  'state_or_province',
  'zip_or_postal_code',
  'sorting_code',
  'country'
);
