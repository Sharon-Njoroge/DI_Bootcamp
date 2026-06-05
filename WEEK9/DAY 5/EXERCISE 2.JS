import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCurrentGenre, 
  selectFilteredBooks, 
  setGenreFilter,
  // We can also import the specific selectors if needed for individual badges/metrics
  selectHorrorBooks,
  selectFantasyBooks,
  selectScienceFictionBooks
} from './store';

export default function BookList() {
  const dispatch = useDispatch();
  
  // Extract state using our optimized selectors
  const currentGenre = useSelector(selectCurrentGenre);
  const filteredBooks = useSelector(selectFilteredBooks);

  // Getting counts dynamically from specific selectors to showcase their independent utility
  const horrorCount = useSelector(selectHorrorBooks).length;
  const fantasyCount = useSelector(selectFantasyBooks).length;
  const sciFiCount = useSelector(selectScienceFictionBooks).length;

  const handleGenreChange = (e) => {
    dispatch(setGenreFilter(e.target.value));
  };

  return (
    <div style={styles.container}>
      <h2>📚 Book Inventory Management</h2>
      
      {/* Quick Insights using specific selectors */}
      <div style={styles.badgeContainer}>
        <span style={styles.badge}>Horror: {horrorCount}</span>
        <span style={styles.badge}>Fantasy: {fantasyCount}</span>
        <span style={styles.badge}>Sci-Fi: {sciFiCount}</span>
      </div>

      {/* Filter UI */}
      <div style={styles.filterSection}>
        <label htmlFor="genre-select" style={styles.label}>Filter by Genre: </label>
        <select 
          id="genre-select" 
          value={currentGenre} 
          onChange={handleGenreChange}
          style={styles.select}
        >
          <option value="All">All Genres</option>
          <option value="Horror">Horror</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>
      </div>

      {/* Dynamic Inventory Display */}
      <div style={styles.listContainer}>
        {filteredBooks.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Author</th>
                <th style={styles.th}>Genre</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map(book => (
                <tr key={book.id} style={styles.tr}>
                  <td style={styles.td}><strong>{book.title}</strong></td>
                  <td style={styles.td}>{book.author}</td>
                  <td style={styles.td}><span style={styles.genreTag}>{book.genre}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books found for this genre.</p>
        )}
      </div>
    </div>
  );
}

// Inline Styles for crisp presentation
const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' },
  badgeContainer: { display: 'flex', gap: '10px', marginBottom: '20px' },
  badge: { backgroundColor: '#f0f0f0', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' },
  filterSection: { marginBottom: '20px' },
  label: { fontWeight: 'bold', marginRight: '10px' },
  select: { padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' },
  listContainer: { marginTop: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  th: { borderBottom: '2px solid #ddd', padding: '10px', backgroundColor: '#fafafa' },
  td: { borderBottom: '1px solid #ddd', padding: '10px' },
  tr: { hover: { backgroundColor: '#f5f5f5' } },
  genreTag: { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }
};