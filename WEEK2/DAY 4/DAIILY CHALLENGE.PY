import string
import re

class Text:
    def __init__(self, text):
        self.text = text

    def _get_words(self):
        """Helper method to clean and split text into lowercase words."""
        # We lowercase to ensure 'The' and 'the' are counted as the same word
        return self.text.lower().split()

    def word_frequency(self, word):
        words = self._get_words()
        count = words.count(word.lower())
        return count if count > 0 else f"The word '{word}' was not found."

    def most_common_word(self):
        words = self._get_words()
        if not words:
            return None
        
        frequency = {}
        for w in words:
            frequency[w] = frequency.get(w, 0) + 1
        
        # Find the key with the maximum value
        common = max(frequency, key=frequency.get)
        return common

    def unique_words(self):
        words = self._get_words()
        # Sets automatically handle uniqueness
        return list(set(words))

    @classmethod
    def from_file(cls, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            return cls(content)
        except FileNotFoundError:
            return "Error: File not found."

class TextModification(Text):
    def remove_punctuation(self):
        # string.punctuation contains: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
        translator = str.maketrans('', '', string.punctuation)
        self.text = self.text.translate(translator)
        return self.text

    def remove_stop_words(self):
        stop_words = {
            "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", 
            "with", "is", "are", "was", "were", "of", "it", "this", "that"
        }
        words = self.text.split()
        filtered_words = [w for w in words if w.lower() not in stop_words]
        self.text = " ".join(filtered_words)
        return self.text

    def remove_special_characters(self):
        # Keeps only alphanumeric characters and spaces
        self.text = re.sub(r'[^a-zA-Z0-9\s]', '', self.text)
        return self.text

# --- Example Usage ---
raw_text = "Hello world! This is a test. Hello again, world?"
analyzer = TextModification(raw_text)

print(f"Original: {analyzer.text}")
print(f"Unique Words: {analyzer.unique_words()}")
print(f"Most Common: {analyzer.most_common_word()}")

analyzer.remove_punctuation()
analyzer.remove_stop_words()
print(f"Cleaned Text: {analyzer.text}")