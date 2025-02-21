import re
import json

def fix_json_in_sql(input_file, output_file):
    def fix_json_string(json_string):
        """Fix common JSON formatting issues."""
        json_string = json_string.replace("''", "'")  # Fix double single quotes
        json_string = json_string.replace("'", '"')  # Replace single quotes with double quotes
        json_string = json_string.replace("NULL", "null")  # Replace NULL with null
        json_string = json_string.strip()
        return json_string

    with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8') as outfile:
        for line_number, line in enumerate(infile, start=1):
            if line.startswith("INSERT INTO cards VALUES"):
                try:
                    # Extract the content inside the parentheses
                    match = re.search(r"VALUES\((.*)\);", line)
                    if not match:
                        raise ValueError(f"Malformed line {line_number}: {line.strip()}")

                    values = match.group(1)

                    # Split values by commas, keeping nested structures intact
                    split_values = re.split(r",(?=(?:[^\"\']*[\"]{1}[^\"\']*[\"]{1})*[^\"\']*$)", values)

                    # Fix each value individually
                    fixed_values = []
                    for value in split_values:
                        value = value.strip()

                        # Process JSON-like fields
                        if value.startswith("[") or value.startswith("{"):
                            try:
                                # Attempt to load as JSON
                                json_value = fix_json_string(value)
                                json.loads(json_value)  # Validate JSON
                                fixed_values.append(json_value)
                            except json.JSONDecodeError:
                                raise ValueError(f"Invalid JSON on line {line_number}: {value}")
                        elif value.upper() == "NULL":
                            fixed_values.append("null")
                        else:
                            # Ensure other values are quoted
                            fixed_values.append(f'"{value.strip()}"' if not value.startswith('"') else value)

                    # Reconstruct the fixed INSERT statement
                    fixed_line = f"INSERT INTO cards VALUES({','.join(fixed_values)});\n"
                    outfile.write(fixed_line)

                except Exception as e:
                    print(f"Error processing line {line_number}: {e}")
                    print(f"Problematic line: {line.strip()}")
                    continue
            else:
                outfile.write(line)

if __name__ == "__main__":
    input_file = "cards_data.txt"  # Replace with your input file name
    output_file = "fixed_cards_data.txt"  # Replace with your output file name
    fix_json_in_sql(input_file, output_file)
    print(f"Fixed SQL statements saved to {output_file}")
