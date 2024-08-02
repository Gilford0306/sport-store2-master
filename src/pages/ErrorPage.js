import React from 'react';
import { Link } from 'react-router-dom';


function ErrorPage() {
 return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.text}>Схоже, ми не можемо знайти потрібну вам сторінку</p>
      <Link to="/" style={styles.button}>Перейти на головну</Link>
    </div>
  );
}
const styles = {
  container: {
    textAlign: 'center',
    margin: '150px',
  },
  header: {
    fontSize: '72px',
  },
  text: {
    fontSize: '24px',
  },
  button: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  }
};

export default ErrorPage;
