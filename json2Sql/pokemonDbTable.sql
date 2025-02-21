-- Create the series table
CREATE TABLE series (
  id TEXT PRIMARY KEY,
  name TEXT,
  imageUrl TEXT,
  totalCards INTEGER,
  numOfCards INTEGER,
  releaseDate DATE,
  lastCardDate DATE,
  updatedAt TIMESTAMP
);

-- Create the sets table
CREATE TABLE sets (
  id TEXT PRIMARY KEY,
  name TEXT,
  series TEXT,
  printedTotal INTEGER,
  total INTEGER,
  ptcgoCode TEXT,
  legalitiesunlimited BOOLEAN,
  legalitiesstandard BOOLEAN,
  legalitiesexpanded BOOLEAN,
  releaseDate DATE,
  updatedAt TIMESTAMP,
  symbolUrl TEXT,
  backupUrl TEXT,
  imageUrl TEXT,
  FOREIGN KEY (series) REFERENCES series(id)
);

-- Create the cards table
CREATE TABLE cards (
  id TEXT PRIMARY KEY,
  name TEXT,
  supertype TEXT,
  subtypes TEXT[],
  hp TEXT,
  types TEXT[],
  evolvesFrom TEXT,
  evolvesTo TEXT[],
  attacks JSONB,
  weaknesses JSONB[],
  resistances JSONB[],
  retreatCost TEXT[],
  convertedRetreatCost INTEGER,
  set_id TEXT,
  number TEXT,
  artist TEXT,
  rarity TEXT,
  flavorText TEXT,
  nationalPokedexNumbers INTEGER[],
  legalities JSONB,
  images JSONB,
  tcgplayer JSONB,
  cardmarket JSONB,
  imageUrl TEXT,
  backupImageUrl TEXT,
  FOREIGN KEY (set_id) REFERENCES sets(id)
);
