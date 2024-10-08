CREATE DATABASE IF NOT EXISTS userdb;
GRANT ALL PRIVILEGES ON userdb.* TO 'user'@'localhost' IDENTIFIED BY 'pass';
GRANT CREATE, DROP, REFERENCES, ALTER ON *.* TO 'user'@'localhost';
GRANT CREATE, DROP ON *.* TO 'user'@'localhost';
FLUSH PRIVILEGES;