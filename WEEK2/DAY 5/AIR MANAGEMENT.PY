from datetime import date, datetime

class Airline:
    """Represents an airline company."""
    def __init__(self, id: str, name: str):
        self.id = id  # Two-letter code
        self.name = name
        self.planes = []

class Airplane:
    """Represents a physical aircraft."""
    def __init__(self, airplane_id: int, current_location: 'Airport', company: Airline):
        self.id = airplane_id
        self.current_location = current_location
        self.company = company
        self.next_flights = []
        
        # Register the plane with the airline and airport
        self.company.planes.append(self)
        self.current_location.planes.append(self)

    def fly(self, destination: 'Airport'):
        """Executes the next scheduled flight if it matches the destination."""
        if not self.next_flights:
            print(f"Plane {self.id} has no scheduled flights.")
            return

        next_flight = self.next_flights[0]
        if next_flight.destination == destination:
            next_flight.take_off()
            next_flight.land()
        else:
            print(f"Error: Next scheduled flight for {self.id} is not to {destination.city}.")

    def location_on_date(self, target_date: date):
        """Returns the Airport where the plane will be at the end of a specific date."""
        # Current location is the default if no flights are scheduled before/on that date
        current_loc = self.current_location
        
        # Flights are sorted by date. We find the last flight that occurs on or before target_date
        for flight in self.next_flights:
            if flight.date <= target_date:
                current_loc = flight.destination
            else:
                break
        return current_loc

    def available_on_date(self, target_date: date, location: 'Airport'):
        """Checks if the plane is at the location and has no flights that day."""
        # 1. Is it at the right location at the start of that day?
        # This requires checking the location after the previous day's flight
        if self.location_on_date(target_date) != location:
            # Note: In a real system, we'd check the day before, 
            # but here location_on_date handles the 'current' state.
            pass 

        # 2. Does it already have a flight on this specific date?
        has_flight_that_day = any(f.date == target_date for f in self.next_flights)
        
        # 3. Final check: Is it physically at the location currently?
        # For simplicity in this logic: it's available if it ends up at 'location' 
        # and isn't busy.
        return not has_flight_that_day and self.location_on_date(target_date) == location

class Flight:
    """Represents a scheduled journey between two airports."""
    def __init__(self, flight_date: date, origin: 'Airport', destination: 'Airport', plane: Airplane):
        self.date = flight_date
        self.origin = origin
        self.destination = destination
        self.plane = plane
        # ID Format: DEST-AIRLINE-DATE
        self.id = f"{destination.city}-{plane.company.id}-{flight_date.isoformat()}"

    def take_off(self):
        print(f"Flight {self.id} is taking off from {self.origin.city}...")
        # Remove plane from origin's current planes list
        if self.plane in self.origin.planes:
            self.origin.planes.remove(self.plane)

    def land(self):
        print(f"Flight {self.id} has landed at {self.destination.city}.")
        # Update plane state
        self.plane.current_location = self.destination
        self.destination.planes.append(self.plane)
        # Remove this flight from the upcoming schedules
        if self in self.plane.next_flights:
            self.plane.next_flights.remove(self)
        if self in self.origin.scheduled_departures:
            self.origin.scheduled_departures.remove(self)
        if self in self.destination.scheduled_arrivals:
            self.destination.scheduled_arrivals.remove(self)

class Airport:
    """Represents an airport hub."""
    def __init__(self, city_code: str):
        self.city = city_code
        self.planes = []
        self.scheduled_departures = []
        self.scheduled_arrivals = []

    def schedule_flight(self, destination: 'Airport', flight_date: date):
        """Finds an available plane and schedules a new flight."""
        available_plane = None
        
        # Search for a plane currently at this airport or scheduled to be here
        for plane in Airplane.all_planes_reference: # Helper reference
            if plane.available_on_date(flight_date, self):
                available_plane = plane
                break
        
        if not available_plane:
            print(f"No available planes at {self.city} for {flight_date}")
            return None

        # Create the flight
        new_flight = Flight(flight_date, self, destination, available_plane)
        
        # Update schedules
        available_plane.next_flights.append(new_flight)
        available_plane.next_flights.sort(key=lambda x: x.date)
        
        self.scheduled_departures.append(new_flight)
        self.scheduled_departures.sort(key=lambda x: x.date)
        
        destination.scheduled_arrivals.append(new_flight)
        destination.scheduled_arrivals.sort(key=lambda x: x.date)
        
        print(f"Successfully scheduled flight {new_flight.id}")
        return new_flight

    def info(self, start_date: date, end_date: date):
        """Displays all departures within a date range."""
        print(f"\n--- Departures from {self.city} ({start_date} to {end_date}) ---")
        found = False
        for flight in self.scheduled_departures:
            if start_date <= flight.date <= end_date:
                print(f"Date: {flight.date} | ID: {flight.id} | Plane: {flight.plane.id} | To: {flight.destination.city}")
                found = True
        if not found:
            print("No flights scheduled in this range.")
      # Global reference for the simulation to find planes
Airplane.all_planes_reference = []

# 1. Setup Infrastructure
jfk = Airport("JFK")
lax = Airport("LAX")
cdg = Airport("CDG")

delta = Airline("DL", "Delta Airlines")
air_france = Airline("AF", "Air France")

# 2. Create Planes
p1 = Airplane(101, jfk, delta)
p2 = Airplane(202, cdg, air_france)
Airplane.all_planes_reference.extend([p1, p2])

# 3. Schedule Flights
print("--- Scheduling ---")
today = date(2024, 5, 20)
tomorrow = date(2024, 5, 21)

# Schedule JFK to LAX
f1 = jfk.schedule_flight(lax, today)

# Try to schedule the same plane again today (should fail or pick another)
f2 = jfk.schedule_flight(cdg, today) 

# Schedule the same plane for tomorrow from its new destination (LAX)
f3 = lax.schedule_flight(jfk, tomorrow)

# 4. Display Airport Info
jfk.info(date(2024, 5, 1), date(2024, 12, 31))

# 5. Execute Flight
print("\n--- Flight Execution ---")
p1.fly(lax)

print(f"Current location of Plane 101: {p1.current_location.city}")
      