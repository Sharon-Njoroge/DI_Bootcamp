class Human:
    def __init__(self, id_number, name, age, priority, blood_type):
        self.id_number = id_number
        self.name = name
        self.age = age
        self.priority = priority
        self.blood_type = blood_type
        # Part 2 attribute
        self.family = []

    def add_family_member(self, person):
        if person not in self.family:
            self.family = self.family + [person]
            person.family = person.family + [self]
     class Queue:
    def __init__(self):
        self.humans = []

    def add_person(self, person):
        if person.age > 60 or person.priority:
            # Add to the beginning
            self.humans = [person] + self.humans
        else:
            # Add to the end
            self.humans = self.humans + [person]

    def find_in_queue(self, person):
        for i in range(len(self.humans)):
            if self.humans[i] == person:
                return i
        return -1

    def swap(self, person1, person2):
        idx1 = self.find_in_queue(person1)
        idx2 = self.find_in_queue(person2)
        if idx1 != -1 and idx2 != -1:
            self.humans[idx1], self.humans[idx2] = self.humans[idx2], self.humans[idx1]

    def get_next(self):
        if not self.humans:
            return None
        next_person = self.humans[0]
        # Remove first element manually
        self.humans = self.humans[1:]
        return next_person

    def get_next_blood_type(self, blood_type):
        for i in range(len(self.humans)):
            if self.humans[i].blood_type == blood_type:
                person = self.humans[i]
                # Remove person and reconstruct list
                self.humans = self.humans[:i] + self.humans[i+1:]
                return person
        return None

    def sort_by_age(self):
        # Implementation of a basic Bubble Sort to avoid .sort()
        n = len(self.humans)
        for i in range(n):
            for j in range(0, n - i - 1):
                h1 = self.humans[j]
                h2 = self.humans[j+1]
                
                # Sorting Logic: 
                # 1. Priority takes precedence
                # 2. If priorities are equal, older age takes precedence
                swap_needed = False
                if h2.priority and not h1.priority:
                    swap_needed = True
                elif h1.priority == h2.priority and h2.age > h1.age:
                    swap_needed = True
                
                if swap_needed:
                    self.humans[j], self.humans[j+1] = self.humans[j+1], self.humans[j]
    def rearrange_queue(self):
        if len(self.humans) < 3:
            return

        i = 0
        while i < len(self.humans) - 1:
            current = self.humans[i]
            next_p = self.humans[i+1]
            
            # Check if the next person is in the current person's family
            is_family = False
            for member in current.family:
                if member == next_p:
                    is_family = True
                    break
            
            if is_family:
                # Find someone further down to swap with
                swapped = False
                for j in range(i + 2, len(self.humans)):
                    # Check if swapping disrupts the previous or next person
                    potential_swap = self.humans[j]
                    
                    # Manual family check for the swap
                    is_safe = True
                    for m in current.family:
                        if m == potential_swap: is_safe = False
                    
                    if is_safe:
                        self.humans[i+1], self.humans[j] = self.humans[j], self.humans[i+1]
                        swapped = True
                        break
                
                # If no safe swap found, we move on (or could handle as an edge case)
                i += 1
            else:
                i += 1
                                       