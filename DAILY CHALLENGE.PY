import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        # Step 2: Initialize attributes
        self.items = items if items is not None else []
        self.page_size = int(page_size)
        self.current_idx = 0  # Internal 0-based index
        
        # Calculate total pages using math.ceil
        self.total_pages = math.ceil(len(self.items) / self.page_size) or 1

    def get_visible_items(self):
        # Step 3: Use slicing to get the current page's items
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def go_to_page(self, page_num):
        # Step 4: Validate and jump to a specific page
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page number {page_num} is out of range (1-{self.total_pages}).")
        
        self.current_idx = page_num - 1
        return self

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        # Step 5: Bonus - Custom string representation
        return "\n".join(self.get_visible_items())

# --- Step 6: Testing the Code ---

alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

# Initial view
print(f"Page 1: {p.get_visible_items()}") # ['a', 'b', 'c', 'd']

# Navigation
p.next_page()
print(f"Page 2: {p.get_visible_items()}") # ['e', 'f', 'g', 'h']

p.last_page()
print(f"Last Page: {p.get_visible_items()}") # ['y', 'z']

# Method Chaining Bonus
# We go to the first page, then move forward 3 times
chained_result = p.first_page().next_page().next_page().next_page().get_visible_items()
print(f"Chained Result (Page 4): {chained_result}") # ['m', 'n', 'o', 'p']

# Error Handling
try:
    p.go_to_page(10)
except ValueError as e:
    print(f"Error caught: {e}")