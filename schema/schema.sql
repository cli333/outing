CREATE TABLE users
(
  id INT NOT NULL
  AUTO_INCREMENT PRIMARY KEY, email VARCHAR
  (100) NOT NULL
)

  CREATE TABLE trips
  (
    id INT
    AUTO_INCREMENT PRIMARY KEY, 
    startingLocation VARCHAR
    (100) NOT NULL, 
    startingLocationCoordinates VARCHAR
    (100) NOT NULL,
    directions TEXT NOT NULL, 
    directionsCoordinates TEXT NOT NULL,
    destination VARCHAR
    (100) NOT NULL, 
    destinationCoordinates VARCHAR
    (100) NOT NULL,
    destinationIcon VARCHAR
    (100),
    createdAt DATETIME
    DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL,
    FOREIGN KEY
    (userId) REFERENCES users
    (id)
)