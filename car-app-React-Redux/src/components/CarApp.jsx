import React from 'react';
import { useMySelector } from '../hooks/useMySelector';
import { useMyDispatch } from '../hooks/useMyDispatch';
import { sellCarAsync, restock } from '../slices/rtkCarSlice';
import { clearLogs } from '../slices/activitySlice';

const CarApp = () => {
  const cars = useMySelector(state => state.car.cars);
  const loadingId = useMySelector(state => state.car.loadingId);
  const logs = useMySelector(state => state.history.logs);
  const dispatch = useMyDispatch();

  // --- Professional Styled UI ---
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>Car Inventory</h1>
        <button 
          onClick={() => dispatch(restock())} 
          style={styles.restockBtn}
          onMouseOver={(e) => e.target.style.backgroundColor = '#d97706'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#f59e0b'}
        >
          🔄 Restock Inventory
        </button>
      </div>

      {/* Grid Section */}
      <div style={styles.grid}>
        {cars.map(car => {
          const isProcessing = loadingId === car.id;
          const isOutOfStock = car.quantity <= 0;

          return (
            <div key={car.id} style={styles.card}>
              <h3 style={styles.carName}>{car.name}</h3>
              <div style={styles.badgeContainer}>
                <span style={{...styles.qtyBadge, backgroundColor: isOutOfStock ? '#fee2e2' : '#f0fdf4'}}>
                   Qty: <strong style={{color: isOutOfStock ? '#dc2626' : '#16a34a'}}>{car.quantity}</strong>
                </span>
              </div>
              
              <button 
                disabled={isOutOfStock || isProcessing} 
                onClick={() => dispatch(sellCarAsync(car.id))}
                style={{
                  ...styles.sellBtn,
                  backgroundColor: isOutOfStock ? '#94a3b8' : (isProcessing ? '#6366f1' : '#4f46e5'),
                  cursor: (isOutOfStock || isProcessing) ? 'not-allowed' : 'pointer'
                }}
              >
                {isProcessing ? '⌛ Processing...' : 'Confirm Sale'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Activity Log Section */}
      <div style={styles.logContainer}>
        <div style={styles.logHeader}>
          <h3 style={styles.logTitle}>Live Activity Feed</h3>
          <button onClick={() => dispatch(clearLogs())} style={styles.clearBtn}>Clear Logs</button>
        </div>
        <ul style={styles.logList}>
          {logs.length === 0 ? (
            <li style={styles.emptyLog}>No recent transactions recorded.</li>
          ) : (
            logs.map((log, index) => (
              <li key={index} style={styles.logItem}>
                <span style={styles.logDot}></span> {log}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

// --- Professional Style Object (Clean & Modern) ---
const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Inter', -apple-system, sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#1e293b'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '35px',
    fontWeight: '500',
    color: 'green',
    margin: 0
  },
  restockBtn: {
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    transition: '0.2s'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px'
  },
  card: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    textAlign: 'center'
  },
  carName: {
    margin: '0 0 12px 0',
    color: '#334155',
    fontSize: '20px'
  },
  badgeContainer: {
    marginBottom: '20px'
  },
  qtyBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  sellBtn: {
    width: '100%',
    padding: '12px',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logContainer: {
    marginTop: '50px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  logHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '15px',
    marginBottom: '15px'
  },
  logTitle: { margin: 0, fontSize: '30px', color: 'green' },
clearBtn: {
  backgroundColor: '#fee2e2', // Light red background
  color: '#b91c1c',           // Darker red font
  border: '1px solid #fecaca', // Subtle border
  padding: '6px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '600',
  transition: '0.2s ease',
  outline: 'none',
},
  logList: { listStyle: 'none', padding: 0, margin: 0 },
  logItem: {
    padding: '10px 0',
    borderBottom: '1px solid #f8fafc',
    fontSize: '14px',
    color: '#334155',
    display: 'flex',
    alignItems: 'center'
  },
  logDot: {
    height: '6px',
    width: '6px',
    backgroundColor: '#6366f1',
    borderRadius: '50%',
    marginRight: '10px'
  },
  emptyLog: { color: '#94a3b8', fontStyle: 'italic', fontSize: '14px' }
};

export default CarApp;


