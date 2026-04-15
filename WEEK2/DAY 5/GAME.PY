import random

class Game:
    def get_user_item(self):
        """Asks the user for their choice and validates it."""
        while True:
            choice = input("Select an item (rock, paper, or scissors): ").lower().strip()
            if choice in ['rock', 'paper', 'scissors']:
                return choice
            print("Invalid choice. Please try again.")

    def get_computer_item(self):
        """Randomly selects an item for the computer."""
        return random.choice(['rock', 'paper', 'scissors'])

    def get_game_result(self, user_item, computer_item):
        """Determines the winner based on game rules."""
        if user_item == computer_item:
            return "draw"
        
        # Win conditions for the user
        win_conditions = {
            'rock': 'scissors',
            'paper': 'rock',
            'scissors': 'paper'
        }
        
        if win_conditions[user_item] == computer_item:
            return "win"
        else:
            return "loss"

    def play(self):
        """Executes one round of the game."""
        user_choice = self.get_user_item()
        computer_choice = self.get_computer_item()
        result = self.get_game_result(user_choice, computer_choice)
        
        print(f"\nYou picked {user_choice}, the computer picked {computer_choice}.")
        
        if result == "win":
            print("You win!")
        elif result == "loss":
            print("You lose!")
        else:
            print("It's a draw!")
            
        return result