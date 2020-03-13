-- outings
CREATE TABLE outings (
  id INT PRIMARY KEY AUTO_INCREMENT,
)

-- destinations
CREATE TABLE destinations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  coords_x INT NOT NULL,
  coords_y INT NOT NULL,
  outing_id INT,
  FOREIGN KEY
(outing_id) REFERENCES outings
(id)
)

-- tags
CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tag_name VARCHAR
(255) NOT NULL UNIQUE
)

-- outing_tags
CREATE TABLE outing_tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  outing_id INT NOT NULL,
  tag_id INT NOT NULL,
  FOREIGN KEY
(outing_id) REFERENCES outings
(id),
  FOREIGN KEY
(tag_id) REFERENCES tags
(id),
  PRIMARY KEY
(outing_id, tag_id)
)