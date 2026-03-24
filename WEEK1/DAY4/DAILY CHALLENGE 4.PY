# Coffee Shop Menu Manager (Final Version)

import json

# -------------------- DATA HANDLING --------------------

def load_menu():
    """Load menu from file or return default menu."""
    try:
        with open("menu.json", "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {
            "espresso": 7.0,
            "latte": 12.0,
            "cappuccino": 10.0
        }


def save_menu(menu_dict):
    """Save menu to file."""
    with open("menu.json", "w") as file:
        json.dump(menu_dict, file)


# -------------------- CORE FUNCTIONS --------------------

def show_menu(menu_dict):
    """Print all drinks and prices."""
    if not menu_dict:
        print("The menu is empty.")
    else:
        print("\nCurrent menu:")
        for drink, price in menu_dict.items():
            print(f"{drink} - {price}₪")


def add_item(menu_dict):
    """Add a new drink to the menu."""
    drink = input("Enter new drink name: ").lower()

    if drink in menu_dict:
        print("Item already exists!")
        return

    try:
        price = float(input("Enter price: "))
        if price < 0:
            print("Invalid price.")
            return
    except ValueError:
        print("Invalid input. Please enter a number.")
        return

    menu_dict[drink] = price
    print(f'"{drink}" added!')


def update_price(menu_dict):
    """Change the price of an existing drink."""
    drink = input("Which drink do you want to update? ").lower()

    if drink not in menu_dict:
        print("Item not found.")
        return

    try:
        new_price = float(input("Enter the new price: "))
        if new_price < 0:
            print("Invalid price.")
            return
    except ValueError:
        print("Invalid input.")
        return

    menu_dict[drink] = new_price
    print("Price updated!")


def delete_item(menu_dict):
    """Remove a drink from the menu."""
    drink = input("Which drink do you want to delete? ").lower()

    if drink in menu_dict:
        del menu_dict[drink]
        print("Item deleted.")
    else:
        print("Item not found.")


# -------------------- UI FUNCTIONS --------------------

def show_options():
    """Print the available actions."""
    print("\nWhat would you like to do?")
    print("1. Show menu")
    print("2. Add item")
    print("3. Update price")
    print("4. Delete item")
    print("5. Exit")


# -------------------- MAIN PROGRAM --------------------

def run_coffee_shop():
    """Main loop of the program."""
    menu = load_menu()

    while True:
        show_options()
        choice = input("> ")

        if choice == "1":
            show_menu(menu)

        elif choice == "2":
            add_item(menu)
            save_menu(menu)

        elif choice == "3":
            update_price(menu)
            save_menu(menu)

        elif choice == "4":
            delete_item(menu)
            save_menu(menu)

        elif choice == "5":
            save_menu(menu)
            print("Goodbye!")
            break

        else:
            print("Invalid choice, try again.")


# -------------------- START PROGRAM --------------------

run_coffee_shop()