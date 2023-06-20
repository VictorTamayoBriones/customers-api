CREATE DATABASE IF NOT EXISTS customerdb;

USE customerdb;

CREATE TABLE IF NOT EXISTS customers(
    id INT(20) NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    nss bigint(20) NOT NULL,
    rfc VARCHAR(50) NOT NULL,
    phone bigint(20) NOT NULL,
    address VARCHAR(100) NOT NULL,
    contract VARCHAR(250) DEFAULT NULL,
    PRIMARY KEY(id)
);

INSERT INTO customers(full_name, nss, rfc, phone, address) VALUES
    ('Juan Lopez Lopez', 81735281342, 'QEFM000622MR6', 9871342677, 'small street #455'),
    ('Jose Luis Perez Sanchez', 91767891342, 'MNJI99800JR1', 5567890988, 'main street #111'),
    ('javier Ruiz Delgado', 21341625411, 'JVRU00911RM1', 5570001255, 'wall street #1009'),
    ('Yessyca Diaz Alcantara', 45167811233, 'YSDU98744MM9', 2461240988, 'first street #123');