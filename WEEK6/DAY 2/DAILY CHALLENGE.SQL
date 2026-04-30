-- 1. Setup the Schema and Data
CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
);

INSERT INTO FirstTab (id, name) VALUES
(5, 'Pawan'),
(6, 'Sharlee'),
(7, 'Krish'),
(NULL, 'Avtaar');

CREATE TABLE SecondTab (
    id integer 
);

INSERT INTO SecondTab (id) VALUES
(5),
(NULL);

-- 2. The Puzzle Queries

-- Q1: Expect 0 (Comparison with NULL in subquery results in UNKNOWN)
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL );

-- Q2: Expect 2 (IDs 6 and 7)
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 );

-- Q3: Expect 0 (The presence of NULL in the list makes the whole NOT IN UNKNOWN)
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab );

-- Q4: Expect 2 (Explicitly excluding NULL from subquery allows the match)
SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NOT NULL );12