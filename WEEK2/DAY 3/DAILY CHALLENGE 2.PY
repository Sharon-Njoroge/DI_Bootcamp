from googletrans import Translator

french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]

# Initialize the Translator
translator = Translator()

# Create the dictionary using a dictionary comprehension
# src='fr' specifies French, dest='en' specifies English
translation_dict = {
    word: translator.translate(word, src='fr', dest='en').text 
    for word in french_words
}

print(translation_dict)