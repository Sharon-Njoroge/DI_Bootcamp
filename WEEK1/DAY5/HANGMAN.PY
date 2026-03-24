import random

# Starter Code
wordslist = ['correction', 'childish', 'beach', 'python', 'assertive', 'interference', 'complete', 'share', 'credit card', 'rush', 'south']
word = random.choice(wordslist) 

### YOUR CODE STARTS FROM HERE ###

def play_hangman():
    # 1. Setup Game State
    # We use a list for guessed_letters to keep track of player history
    guessed_letters = []
    lives = 6
    
    # Create the display word (stars for letters, spaces stay as spaces)
    # We use a list because strings in Python are "immutable" (can't be changed easily)
    display_word = []
    for char in word:
        if char == ' ':
            display_word.append(' ')
        else:
            display_word.append('*')

    print("Welcome to Hangman!")
    
    # 2. Main Game Loop
    while lives > 0 and '*' in display_word:
        print(f"\nWord: {''.join(display_word)}")
        print(f"Lives remaining: {lives}")
        print(f"Guessed letters: {', '.join(guessed_letters)}")
        
        guess = input("Guess a letter: ").lower()

        # 3. Validation
        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single valid letter.")
            continue
        
        if guess in guessed_letters:
            print(f"You already guessed '{guess}'! Try a different one.")
            continue
            
        guessed_letters.append(guess)

        # 4. Check Guess
        if guess in word:
            print(f"Good job! '{guess}' is in the word.")
            # Reveal the letter in all correct positions
            for index, letter in enumerate(word):
                if letter == guess:
                    display_word[index] = guess
        else:
            lives -= 1
            print(f"Sorry, '{guess}' is not there. You lost a body part!")

    # 5. Game Over Logic
    if '*' not in display_word:
        print(f"\nCongratulations! You saved the hangman! The word was: {word}")
    else:
        print(f"\nGAME OVER. The gallows are full. The word was: {word}")

if __name__ == "__main__":
    play_hangman()