-- DROP USER IF EXISTS mealappuser;
CREATE USER mealappuser WITH PASSWORD 'super-duper-secret-password';

-- Database: mealapp

-- DROP DATABASE IF EXISTS mealapp;

CREATE DATABASE mealapp
    WITH
    OWNER = mealappuser;

GRANT TEMPORARY, CONNECT ON DATABASE mealapp TO PUBLIC;

GRANT ALL ON DATABASE mealapp TO mealappuser;

-- SCHEMA: mealapp_schema

-- DROP SCHEMA IF EXISTS mealapp_schema ;

CREATE SCHEMA IF NOT EXISTS mealapp_schema
    AUTHORIZATION mealappuser;

-- Table: mealapp_schema.users

-- DROP TABLE IF EXISTS mealapp_schema.users;

CREATE TABLE IF NOT EXISTS mealapp_schema.users
(
    user_id SERIAL NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    api_hash text COLLATE pg_catalog."default" NOT NULL,
    first_name text COLLATE pg_catalog."default",
    last_name text COLLATE pg_catalog."default",
    user_name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS mealapp_schema.users
    OWNER to mealappuser;   

-- Table: mealapp_schema.user_prefs

-- DROP TABLE IF EXISTS mealapp_schema.user_prefs;

CREATE TABLE IF NOT EXISTS mealapp_schema.user_prefs
(
    pref_id SERIAL NOT NULL,
    pref_name text COLLATE pg_catalog."default" NOT NULL,
    pref_value text COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL,    
    CONSTRAINT user_pref_pk PRIMARY KEY (pref_id),
    CONSTRAINT user_prefs_user_fk FOREIGN KEY (user_id)
        REFERENCES mealapp_schema.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS mealapp_schema.user_prefs
    OWNER to mealappuser;    