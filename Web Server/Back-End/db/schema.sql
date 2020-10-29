DROP TABLE IF EXISTS boxes CASCADE;

CREATE TABLE boxes (
    id SERIAL PRIMARY KEY,
    timestamp DATE DEFAULT CURRENT_TIMESTAMP,
    size INTEGER
);

DROP TABLE IF EXISTS cupType CASCADE;

CREATE TABLE cupType (
    type TEXT PRIMARY KEY
);

-- Default cup types.
INSERT INTO cupType VALUES 
('Donut Blend'),
('Breakfast Blend'),
('Colombian Molina'),
('Screaming Monkey'),
('Kenya AA - Medium Roast'),
('Costa Rican - Medium Roast'),
('Kona Island Blend'),
('Colombian Supremo'),
('Dark Estate'),
('Kenya AA - Dark Roast'),
('Costa Rican - Dark Roast'),
('Italian Roast'),
('French Roast'),
('Sumatra Mandeling'),
('Colombian Decaf'),
('French Vanilla'),
('Jamaican Me Nuts'),
('Salted Caramel'),
('Hazelnut');

DROP TABLE IF EXISTS cups;

CREATE TABLE cups (
    id SERIAL PRIMARY KEY,
    type TEXT REFERENCES cupType(type),
    timestamp DATE DEFAULT CURRENT_TIMESTAMP,
    boxId INTEGER REFERENCES boxes(id)
);