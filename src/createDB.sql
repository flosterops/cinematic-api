-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET client_min_messages = warning;
-- SET row_security = off;
--
-- CREATE DATABASE cinematic;

-- ALTER DATABASE cinematic OWNER TO cinematic;

-- \connect cinematic

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE public.User (
    id character varying(128) NOT NULL,
    name character varying(128) NOT NULL,
    password character varying(128) NOT NULL,
    email character varying(128) NOT NULL,
    role INTEGER NOT NULL
);

ALTER TABLE public."user" OWNER TO cinematic;

CREATE TABLE public.Ticket (
    id character varying(128) NOT NULL,
    price INTEGER NOT NULL
);

ALTER TABLE public.Ticket OWNER TO cinematic;

CREATE TABLE public.Customer (
                                 id character varying(128) NOT NULL,
    name character varying(128) NOT NULL,
    address character varying(128) NOT NULL
);

ALTER TABLE public.Customer OWNER TO cinematic;

CREATE TABLE public.Rating (
    stars INTEGER NOT NULL,
    review character varying(256) NOT NULL
);

ALTER TABLE public.Rating OWNER TO cinematic;


CREATE TABLE public.Movie (
    id character varying(128) NOT NULL,
    name character varying(128) NOT NULL,
    description character varying(256) NOT NULL,
    duration INTEGER NOT NULL,
    age INTEGER NOT NULL
);

ALTER TABLE public.Movie OWNER TO cinematic;

CREATE TABLE public.Theater (
    id character varying(128) NOT NULL,
    name character varying(128) NOT NULL,
    number_of_seats character varying(256) NOT NULL,
    duration INTEGER NOT NULL,
    age INTEGER NOT NULL
);

ALTER TABLE public.Theater OWNER TO cinematic;

CREATE TABLE public.Seat (
    number INTEGER NOT NULL,
    row INTEGER NOT NULL,
    type INTEGER NOT NULL,
    removable bool
);

ALTER TABLE public.Seat OWNER TO cinematic;


CREATE TABLE public.Show (
    date INTEGER NOT NULL,
    time character varying(128) NOT NULL
);

ALTER TABLE public.Show OWNER TO cinematic;
