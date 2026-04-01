import random

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
        self.cards = [Card(s, v) for s in suits for v in values]

    def shuffle(self):
        if len(self.cards) < 52:
            print("Cannot shuffle: The deck is incomplete!")
        else:
            random.shuffle(self.cards)
            print("Deck shuffled.")

    def deal(self):
        if len(self.cards) == 0:
            return None
        return self.cards.pop()

    def deal_hand(self, size):
        """Deals a list of cards of the specified size."""
        if size > len(self.cards):
            print(f"Not enough cards! Dealing the remaining {len(self.cards)} cards.")
            size = len(self.cards)
            
        hand = []
        for _ in range(size):
            hand.append(self.deal())
        return hand

# --- Testing the Hand Dealer ---
my_deck = Deck()
my_deck.shuffle()

# Dealing a 5-card Poker hand
poker_hand = my_deck.deal_hand(5)

print(f"Your hand: {poker_hand}")
print(f"Cards left in deck: {len(my_deck.cards)}")
    