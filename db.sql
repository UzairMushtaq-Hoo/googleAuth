-- create database
CREATE DATABASE edge_app;

-- Create App Users Table
CREATE TABLE app_users (
    user_id serial PRIMARY KEY,
    fullname VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    picture VARCHAR(255)
);

-- Create Data Table
CREATE TABLE data_table (
    data_id serial PRIMARY KEY,
    -- to be added more

);



-- insert fake users app_user table
INSERT INTO app_users (fullname, email, picture) VALUES ('M Uzair','uzair@abc.com','uzi123123');
INSERT INTO app_users (fullname, email, picture) VALUES ('Osama','osama@abc.com','osama123');

-- quries
-- select all from users
select * from app_user;
select * from app_user WHERE username = 'm.uzair';


