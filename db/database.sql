CREATE DATABASE IF NOT EXISTS customerdb;

USE customerdb;

CREATE TABLE IF NOT EXISTS customers(
    id VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    nss bigint(20) NOT NULL,
    rfc VARCHAR(50) NOT NULL,
    phone bigint(20) NOT NULL,
    address VARCHAR(100) NOT NULL,
    contract VARCHAR(250) DEFAULT NULL,
    PRIMARY KEY(id)
);

INSERT INTO customers(id, full_name, nss, rfc, phone, address) VALUES
    ('c119c280-6c0f-4187-a3bb-83a87e31f80b', 'Juan Lopez Lopez', 81735281342, 'QEFM000622MR6', 9871342677, 'small street #455'),
    ('13925903-319f-470f-ad5d-e24734322f4e','Jose Luis Perez Sanchez', 91767891342, 'MNJI99800JR1', 5567890988, 'main street #111'),
    ('8db31fc2-e6c6-4bb7-ad9b-0d26fa871f50','javier Ruiz Delgado', 21341625411, 'JVRU00911RM1', 5570001255, 'wall street #1009'),
    ('93f82ed4-a51c-49f0-958f-c205697ad49f','Yessyca Diaz Alcantara', 45167811233, 'YSDU98744MM9', 2461240988, 'first street #123');

CREATE TABLE IF NOT EXISTS versions(
    id VARCHAR(50) NOT NULL,
    id_customer VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    nss bigint(20) NOT NULL,
    rfc VARCHAR(50) NOT NULL,
    phone bigint(20) NOT NULL,
    address VARCHAR(100) NOT NULL,
    contract VARCHAR(250) DEFAULT NULL,
    PRIMARY KEY(id)
)
