from abc import ABC, abstractmethod

class Temperature(ABC):
    def __init__(self, value):
        self.value = value

    @abstractmethod
    def to_kelvin(self):
        pass

    @classmethod
    @abstractmethod
    def from_kelvin(cls, kelvin_value):
        pass

    def convert_to(self, target_class):
        """Converts the current temperature to any other Temperature subclass."""
        kelvin = self.to_kelvin()
        return target_class.from_kelvin(kelvin)

class Celsius(Temperature):
    def to_kelvin(self):
        return self.value + 273.15
    
    @classmethod
    def from_kelvin(cls, k):
        return cls(k - 273.15)

    def __repr__(self):
        return f"{self.value}°C"

class Fahrenheit(Temperature):
    def to_kelvin(self):
        return (self.value - 32) * 5/9 + 273.15
    
    @classmethod
    def from_kelvin(cls, k):
        return cls((k - 273.15) * 9/5 + 32)

    def __repr__(self):
        return f"{self.value}°F"

class Kelvin(Temperature):
    def to_kelvin(self):
        return self.value
    
    @classmethod
    def from_kelvin(cls, k):
        return cls(k)

    def __repr__(self):
        return f"{self.value}K"

# Usage
c = Celsius(25)
f = c.convert_to(Fahrenheit)
print(f"25°C is {f}") # 77.0°F

import random

class QuantumParticle:
    def __init__(self, x=0, y=0.0, p=0.5):
        self._x = x  # Position
        self._y = y  # Momentum
        self._p = p  # Spin
        self.entangled_partner = None

    def _disturb(self):
        """Internal method to change state upon measurement."""
        self._x = random.randint(1, 10000)
        self._y = random.uniform(0, 1)
        print("Quantum Interferences!!")

    def measure_position(self):
        self._disturb()
        return self._x

    def measure_momentum(self):
        self._disturb()
        return self._y

    def measure_spin(self):
        self._disturb()
        # Randomize this particle's spin
        self._p = random.choice([0.5, -0.5])
        
        # If entangled, force the partner to the opposite
        if self.entangled_partner:
            self.entangled_partner._p = -self._p
            print("Spooky Action at a Distance !!")
            
        return self._p

    def entangle(self, other):
        if not isinstance(other, QuantumParticle):
            raise TypeError("Can only entangle with another QuantumParticle!")
        
        self.entangled_partner = other
        other.entangled_partner = self
        print(f"Particle {id(self)} is now in quantum entanglement with Particle {id(other)}")

    def __repr__(self):
        entangled = "Yes" if self.entangled_partner else "No"
        return f"QuantumParticle(Pos: {self._x}, Mom: {self._y:.2f}, Spin: {self._p}, Entangled: {entangled})"

# Execution
p1 = QuantumParticle()
p2 = QuantumParticle()

p1.entangle(p2)
print(f"P1 Spin before measurement: {p1._p}")
print(f"P1 Measured Spin: {p1.measure_spin()}")
print(f"P2 Automatically updated Spin: {p2._p}")

