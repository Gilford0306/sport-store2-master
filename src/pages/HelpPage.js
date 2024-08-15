import React, { useState } from 'react';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>ОТРИМАТИ ДОПОМОГУ</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Чим ми можемо вам допомогти?"
          value={searchQuery}
          onChange={handleInputChange}
          style={styles.searchInput}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    borderRadius: '25px',
    padding: '5px 10px',
    width: '300px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    width: '100%',
  },
};

export default HelpPage;
