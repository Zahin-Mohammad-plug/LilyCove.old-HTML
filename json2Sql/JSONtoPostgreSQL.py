import os
import json
import psycopg2
from urllib.parse import quote_plus
import dotenv from 'dotenv';
dotenv.config();


# Supabase credentials from .env
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT", 5432)

# Database connection
def connect_to_db():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT
        )
        print("Connected to the database.")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        exit(1)

# Helper function to URL-encode IDs
def url_encode_id(series_name):
    return quote_plus(series_name.replace("&", "and").replace(" ", ""))

# Load JSON data
def load_json(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        exit(1)

# Insert series data
def insert_series_data(conn, series_data):
    cursor = conn.cursor()
    for series in series_data:
        try:
            cursor.execute("""
                INSERT INTO series (id, name, cards, sets, image_url, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING;
            """, (
                url_encode_id(series["name"]),
                series["name"],
                len(series["cards"]),
                len(series["sets"]),
                series.get("imageUrl", ""),
                series.get("updatedAt", None)
            ))
        except Exception as e:
            print(f"Error inserting series: {e}")
    conn.commit()

# Insert sets data
def insert_sets_data(conn, sets_data):
    cursor = conn.cursor()
    for set_ in sets_data:
        try:
            cursor.execute("""
                INSERT INTO sets (id, name, series_id, total, printed_total, logo_url, release_date, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING;
            """, (
                set_["id"],
                set_["name"],
                url_encode_id(set_["series"]),
                set_["total"],
                set_["printedTotal"],
                set_["cloudinaryUrl"],
                set_["releaseDate"],
                set_["updatedAt"]
            ))
        except Exception as e:
            print(f"Error inserting set: {e}")
    conn.commit()

# Insert cards data
def insert_cards_data(conn, cards_data):
    cursor = conn.cursor()
    for card in cards_data:
        try:
            cursor.execute("""
                INSERT INTO cards (id, name, supertype, subtypes, hp, types, evolves_from, attacks, weaknesses, resistances, rarity, set_id, image_url, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING;
            """, (
                card["id"],
                card["name"],
                card["supertype"],
                json.dumps(card.get("subtypes", [])),
                card.get("hp", None),
                json.dumps(card.get("types", [])),
                card.get("evolvesFrom", None),
                json.dumps(card.get("attacks", [])),
                json.dumps(card.get("weaknesses", [])),
                json.dumps(card.get("resistances", [])),
                card.get("rarity", None),
                card["set"]["id"],
                card["imageUrl"],
                card["tcgplayer"]["updatedAt"] if "tcgplayer" in card else None
            ))
        except Exception as e:
            print(f"Error inserting card: {e}")
    conn.commit()

# Preview formatted data
def preview_data(data, label, limit=20):
    print(f"\nPreviewing {label} data (First {limit} entries):")
    for item in data[:limit]:
        print(json.dumps(item, indent=2))
    print("\nPreview complete.\n")

# Main function
def main():
    conn = connect_to_db()

    # Load JSON files
    series_data = load_json("series.json")
    sets_data = load_json("sets_updated.json")
    cards_data = load_json("cards_updated.json")

    # Preview data
    preview_data(series_data, "Series")
    preview_data(sets_data, "Sets")
    preview_data(cards_data, "Cards")

    # # Insert data into the database
    # print("Inserting series data...")
    # insert_series_data(conn, series_data)
    # print("Inserting sets data...")
    # insert_sets_data(conn, sets_data)
    # print("Inserting cards data...")
    # insert_cards_data(conn, cards_data)

    print("All data inserted successfully.")
    conn.close()

if __name__ == "__main__":
    main()
