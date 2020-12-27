DROP TABLE IF EXISTS boxCount CASCADE;

CREATE TABLE boxCount (
    boxCount INT PRIMARY KEY DEFAULT 24
);

INSERT INTO boxCount DEFAULT VALUES;

DROP TABLE IF EXISTS boxes CASCADE;

CREATE TABLE boxes (
    id SERIAL PRIMARY KEY,
    timestamp DATE DEFAULT CURRENT_TIMESTAMP,
    size INTEGER NOT NULL
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
('Hazelnut'),
('No Type Selected');

DROP TABLE IF EXISTS currentType;

CREATE TABLE currentType (
    type TEXT REFERENCES cupType(type) PRIMARY KEY DEFAULT ('No Type Selected')
);

INSERT INTO currentType DEFAULT VALUES;

DROP TABLE IF EXISTS cups;

CREATE TABLE cups (
    id SERIAL PRIMARY KEY,
    type TEXT REFERENCES cupType(type),
    timestamp DATE DEFAULT CURRENT_TIMESTAMP,
    boxId INTEGER REFERENCES boxes(id)
);

DROP TABLE IF EXISTS machines;

CREATE TABLE machines (
    id SERIAL PRIMARY KEY,
    timestamp DATE DEFAULT CURRENT_TIMESTAMP,
    lidState BOOLEAN NOT NULL DEFAULT false, -- True represents open, false is closed.
    conveyorState BOOLEAN NOT NULL DEFAULT false, -- True represents running, false is stopped.
    motorCalibrating BOOLEAN NOT NULL DEFAULT false, -- True represents calibrating, false is not.
    sequencing BOOLEAN NOT NULL DEFAULT false -- True represents sequencing, false is not.
);

INSERT INTO machines DEFAULT VALUES;

-- UPDATE currentType SET type = 'Hazelnut';
-- UPDATE boxCount SET boxCount = 7;
-- INSERT INTO boxes(size) VALUES ((SELECT boxCount FROM boxCount LIMIT 1)) RETURNING id;
-- INSERT INTO cups(type, boxId) VALUES ((SELECT type FROM currentType LIMIT 1), (SELECT id FROM boxes ORDER BY id DESC LIMIT 1)) RETURNING id;
-- SELECT * FROM currentType; -- Should return hazelnut.
-- SELECT * FROM boxCount; -- Should return 7.
-- SELECT * FROM boxes; -- Should return a box with ID 1 and size of 7.
-- SELECT * FROM cups; -- Should return a hazelnut bup with a boxId of 1 and an id of 1.
-- SELECT COUNT(*) FROM cups WHERE boxId = (SELECT MAX(id) FROM boxes);
-- SELECT boxCount FROM boxcount LIMIT 1;