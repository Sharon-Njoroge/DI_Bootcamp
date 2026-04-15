from game import Game

def get_user_menu_choice():
    """Displays the menu and returns a validated choice."""
    print("\n--- MENU ---")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")
    
    while True:
        choice = input("Enter your choice (1-3): ").strip()
        if choice in ['1', '2', '3']:
            return choice
        print("Invalid selection. Please enter 1, 2, or 3.")

def print_results(results):
    """Prints the final summary of wins, losses, and draws."""
    print("\n--- Final Game Summary ---")
    print(f"Wins:   {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws:  {results['draw']}")
    print("\nThank you for playing!")

def main():
    """Main loop to run the application."""
    results = {"win": 0, "loss": 0, "draw": 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == '1':
            # Create game instance and play
            new_game = Game()
            outcome = new_game.play()
            results[outcome] += 1
            
        elif choice == '2':
            # Just show current scores without quitting
            print(f"\nCurrent Score: {results}")
            
        elif choice == '3':
            # Show final results and exit
            print_results(results)
            break

if __name__ == "__main__":
    main()