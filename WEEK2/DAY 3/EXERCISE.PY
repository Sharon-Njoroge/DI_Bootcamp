class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        return f"{self.amount} {self.currency}s"

    def __repr__(self):
        return f"{self.amount} {self.currency}s"

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        return self.amount + other

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        else:
            self.amount += other
        return self  # iadd must return self
    def sum_and_print(a, b):
      print(a + b)

from func import sum_and_print

sum_and_print(10, 20)

import string
import random

def generate_random_string(length=5):
    letters = string.ascii_letters
    result = ''.join(random.choice(letters) for _ in range(length))
    print(result)

generate_random_string()

from datetime import date

def display_current_date():
    today = date.today()
    print(f"Today's date is: {today}")

display_current_date()

from datetime import datetime

def time_until_new_year():
    now = datetime.now()
    next_year = now.year + 1
    new_year = datetime(next_year, 1, 1)
    
    delta = new_year - now
    
    print(f"The time left until Jan 1st is {delta.days} days and {delta.seconds // 3600} hours.")

time_until_new_year()

from datetime import datetime

def minutes_lived(birthdate_str):
    # Format: YYYY-MM-DD
    birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d")
    now = datetime.now()
    
    difference = now - birthdate
    minutes = int(difference.total_seconds() / 60)
    
    print(f"You have lived for approximately {minutes:,} minutes.")

# Example call
minutes_lived("1995-05-15")

from faker import Faker

fake = Faker()
users = []

def add_users(how_many):
    for _ in range(how_many):
        user = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code()
        }
        users.append(user)

add_users(5)
for u in users:
    print(u)

    
