CREATE SCHEMA clase_db;

-- Seleccionamos la DB
USE clase_db;

-- Creamos la tabla USERS
CREATE TABLE users(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    province_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Creamos la tabla provinces

CREATE TABLE provinces(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


ALTER TABLE users
ADD FOREIGN KEY (province_id) REFERENCES provinces(id);

--
-- Volcado de datos para la tabla `provinces`
--

INSERT INTO provinces (`id`, `name`) VALUES 
(1, 'Tucuman'),
(2, 'Buenos aires'),
(3, 'Misiones'),
(4, 'Cordoba'),
(5, 'Mendoza');