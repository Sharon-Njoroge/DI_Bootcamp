import random

class Game:
    def __init__(self):
        self.options = ["rock", "paper", "scissors"]

    def get_user_item(self):
        """Asks user for input and validates it."""
        while True:
            user_choice = input("Select an item (rock/paper/scissors): ").lower().strip()
            if user_choice in self.options:
                return user_choice
            print("Invalid choice. Please try again.")

    def get_computer_item(self):
        """Randomly selects an item for the computer."""
        return random.choice(self.options)

    def get_game_result(self, user_item, computer_item):
        """Determines if the user won, lost, or drew."""
        if user_item == computer_item:
            return "draw"
        
        # Define winning conditions for the user
        win_conditions = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        }
        
        if win_conditions[user_item] == computer_item:
            return "win"
        else:
            return "loss"

    def play(self):
        """Executes one round of the game."""
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)
        
        print(f"\nYou chose: {user_item}")
        print(f"Computer chose: {computer_item}")
        print(f"Result: You {result}!\n")
        
        return result
if __name__ == "__main__":
    game = Game()
    while True:
        game.play()
        play_again = input("Do you want to play again? (yes/no): ").lower().strip()
        if play_again != "yes":
            print("Thanks for playing!")
            break       