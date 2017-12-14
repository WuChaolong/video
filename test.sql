CREATE TABLE testisit5 (
    key varchar (100) NOT NULL PRIMARY KEY,
    value varchar (250) NOT NULL,
    install_date date not null default CURRENT_DATE
);
INSERT INTO testisit5 (url, key) VALUES ('slide', 'south');

ALTER TABLE testisit DROP key;
ALTER TABLE testisit ADD  url varchar (250);