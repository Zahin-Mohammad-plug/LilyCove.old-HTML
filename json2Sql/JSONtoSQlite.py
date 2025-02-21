import json
import sqlite3
import os

# Load JSON files
def load_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            print(f"Loaded {len(data)} records from {file_path}")
            return data
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return []

# Initialize the SQLite database using pokemonDbTable.sql
def initialize_db(db_name, sql_file):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    # Load and execute SQL schema from pokemonDbTable.sql
    try:
        with open(sql_file, 'r', encoding='utf-8') as file:
            sql_script = file.read()
            cursor.executescript(sql_script)
            print(f"Database initialized using {sql_file}")
    except Exception as e:
        print(f"Error executing {sql_file}: {e}")
    
    return conn

# Insert series data
def insert_series_data(conn, series_data):
    cursor = conn.cursor()
    print("Inserting series data...")
    for series in series_data:
        try:
            cursor.execute('''
                INSERT OR IGNORE INTO series (id, name, imageUrl, totalCards, numOfCards, releaseDate, lastCardDate, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                series.get('id'),
                series.get('name'),
                series.get('imageUrl'),
                series.get('totalCards'),
                series.get('numOfCards'),
                series.get('releaseDate'),
                series.get('lastCardDate'),
                series.get('updatedAt')
            ))
        except Exception as e:
            print(f"Error inserting series {series.get('name')}: {e}")
    conn.commit()
    print("Series data inserted successfully.")

# Insert sets data
def insert_sets_data(conn, sets_data):
    cursor = conn.cursor()
    print("Inserting sets data...")
    for set_item in sets_data:
        try:
            cursor.execute('''
                INSERT OR IGNORE INTO sets (id, name, series, printedTotal, total, ptcgoCode, legalitiesunlimited, legalitiesstandard, legalitiesexpanded, releaseDate, updatedAt, symbolUrl, backupUrl, imageUrl)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                set_item.get('id'),
                set_item.get('name'),
                set_item.get('series'),
                set_item.get('printedTotal'),
                set_item.get('total'),
                set_item.get('ptcgoCode'),
                set_item.get('legalities', {}).get('unlimited', False),
                set_item.get('legalities', {}).get('standard', False),
                set_item.get('legalities', {}).get('expanded', False),
                set_item.get('releaseDate'),
                set_item.get('updatedAt'),
                set_item.get('images', {}).get('symbol'),
                set_item.get('backupLogoUrl'),
                set_item.get('imageUrls', {}).get('logo')
            ))
        except Exception as e:
            print(f"Error inserting set {set_item.get('name')}: {e}")
    conn.commit()
    print("Sets data inserted successfully.")

# Insert cards data
def insert_cards_data(conn, cards_data):
    cursor = conn.cursor()
    print("Inserting cards data...")
    for card in cards_data:
        try:
            cursor.execute('''
                INSERT OR IGNORE INTO cards (id, name, supertype, subtypes, hp, types, evolvesFrom, evolvesTo, attacks, weaknesses, resistances, retreatCost, convertedRetreatCost, set_id, number, artist, rarity, flavorText, nationalPokedexNumbers, legalities, images, tcgplayer, cardmarket, imageUrl, backupImageUrl)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                card.get('id'),
                card.get('name'),
                card.get('supertype'),
                json.dumps(card.get('subtypes', [])),
                card.get('hp'),
                json.dumps(card.get('types', [])),
                card.get('evolvesFrom'),
                json.dumps(card.get('evolvesTo', [])),
                json.dumps(card.get('attacks', [])),
                json.dumps(card.get('weaknesses', [])),
                json.dumps(card.get('resistances', [])),
                json.dumps(card.get('retreatCost', [])),
                card.get('convertedRetreatCost'),
                card.get('set', {}).get('id'),
                card.get('number'),
                card.get('artist'),
                card.get('rarity'),
                card.get('flavorText'),
                json.dumps(card.get('nationalPokedexNumbers', [])),
                json.dumps(card.get('legalities', {})),
                json.dumps(card.get('images', {})),
                json.dumps(card.get('tcgplayer', {})),
                json.dumps(card.get('cardmarket', {})),
                card.get('imageUrl'),
                card.get('backupImageUrl')
            ))
        except Exception as e:
            print(f"Error inserting card {card.get('name')}: {e}")
    conn.commit()
    print("Cards data inserted successfully.")

# Main function
def main():
    # Load JSON data
    cards_data = load_json('cards_updated.json')
    sets_data = load_json('sets_updated.json')
    series_data = load_json('series.json')

    # Initialize database using pokemonDbTable.sql
    conn = initialize_db('pokemonDb.sqlite', 'pokemonDbTable.sql')

    # Insert data into tables
    insert_series_data(conn, series_data)
    insert_sets_data(conn, sets_data)
    insert_cards_data(conn, cards_data)

    # Close the database connection
    conn.close()
    print("Database connection closed.")

# Run the main function
if __name__ == '__main__':
    main()
