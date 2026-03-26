from datetime import datetime
import holidays

def upcoming_holiday():
    today = datetime.now()
    print(f"Today's date is: {today.strftime('%Y-%m-%d')}")
    
    # Get holidays for a specific country (e.g., US)
    us_holidays = holidays.US(years=today.year)
    
    # Filter for future holidays in the current year
    future_holidays = {date: name for date, name in us_holidays.items() if date > today.date()}
    
    if not future_holidays:
        # If no more holidays this year, look at next year
        us_holidays = holidays.US(years=today.year + 1)
        future_holidays = {date: name for date, name in us_holidays.items()}

    # Find the closest one
    next_date = min(future_holidays.keys())
    next_name = future_holidays[next_date]
    
    # Calculate difference
    # Convert next_date (date object) to datetime for subtraction
    time_diff = datetime.combine(next_date, datetime.min.time()) - today
    
    print(f"The next holiday is {next_name} in {time_diff.days} days.")

upcoming_holiday()

def calculate_space_age(seconds):
    earth_year_seconds = 31557600
    earth_age = seconds / earth_year_seconds
    
    planets = {
        "Earth": 1.0,
        "Mercury": 0.2408467,
        "Venus": 0.61519726,
        "Mars": 1.8808158,
        "Jupiter": 11.862615,
        "Saturn": 29.447498,
        "Uranus": 84.016846,
        "Neptune": 164.79132
    }
    
    for planet, orbital_period in planets.items():
        planet_age = earth_age / orbital_period
        print(f"{planet}: {planet_age:.2f} years old")

calculate_space_age(1_000_000_000)

import re

def return_numbers(text):
    numbers = re.findall(r'\d', text)
    return "".join(numbers)

print(return_numbers('k5k3q2g5z6x9bn')) # Output: 532569

import re

def validate_name():
    name = input("Please enter your full name (First Last): ")
    pattern = r'^[A-Z][a-z]+ [A-Z][a-z]+$'
    
    if re.match(pattern, name):
        print("Valid name!")
    else:
        print("Invalid format. Ensure only letters, one space, and proper capitalization.")

validate_name()

import string
import random
import re

def generate_password(length):
    if not (6 <= length <= 30):
        return None
    
    # Requirements
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    digits = string.digits
    special = "!@#$%^&*()_+-="
    
    # Ensure at least one of each
    password = [
        random.choice(lower),
        random.choice(upper),
        random.choice(digits),
        random.choice(special)
    ]
    
    # Fill the rest
    all_chars = lower + upper + digits + special
    password += [random.choice(all_chars) for _ in range(length - 4)]
    
    # Shuffle to hide the fact that the first 4 were forced
    random.shuffle(password)
    return "".join(password)

def test_password(password, length):
    if len(password) != length: return False
    if not re.search(r'[a-z]', password): return False
    if not re.search(r'[A-Z]', password): return False
    if not re.search(r'\d', password): return False
    if not re.search(r'[!@#$%^&*()_+\-=]', password): return False
    return True

# Main Logic
while True:
    user_input = input("Enter password length (6-30): ")
    if user_input.isdigit() and 6 <= int(user_input) <= 30:
        length = int(user_input)
        new_pass = generate_password(length)
        print(f"Generated Password: {new_pass}")
        print("Keep this password in a safe place!")
        break
    print("Invalid input. Please try again.")

# Running 100 Tests
print("\nRunning 100 tests...")
for _ in range(100):
    test_len = random.randint(6, 30)
    p = generate_password(test_len)
    if not test_password(p, test_len):
        print(f"Failed test for: {p}")
print("Tests completed successfully!")

