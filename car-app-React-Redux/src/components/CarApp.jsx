import React from 'react';
import { useMySelector } from '../hooks/useMySelector';
import { useMyDispatch } from '../hooks/useMyDispatch';
import { sellCarAsync, restock } from '../slices/rtkCarSlice';
import { clearLogs } from '../slices/activitySlice';

const CarApp = () => {
  // Use our custom hook to grab data from the store
  const cars = useMySelector(state => state.car.cars);
  const loadingId = useMySelector(state => state.car.loadingId);
  const logs = useMySelector(state => state.history.logs);
  
  const dispatch = useMyDispatch();

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Car Inventory</h1>
        {/* Dispatches the synchronous restock action */}
        <button onClick={() => dispatch(restock())}>🔄 Restock All</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        {cars.map(car => (
          <div key={car.id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h3>{car.name}</h3>
            <p>Quantity: <strong>{car.quantity}</strong></p>
            {/* 
                Button is disabled if out of stock OR if this specific car 
                is currently being sold (Async delay active).
            */}
            <button 
              disabled={car.quantity <= 0 || loadingId === car.id} 
              onClick={() => dispatch(sellCarAsync(car.id))}
              style={{ width: '100%', padding: '10px', cursor: 'pointer' }}
            >
              {loadingId === car.id ? '⌛ Processing...' : 'Sell Car'}
            </button>
          </div>
        ))}
      </div>

      {/* Activity Log Section showing history from state.history */}
      <div style={{ marginTop: '30px', background: '#f9f9f9', padding: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Recent Activity</h3>
          <button onClick={() => dispatch(clearLogs())}>Clear</button>
        </div>
        <ul>
          {logs.length === 0 && <li>No sales yet.</li>}
          {logs.map((log, index) => (
            <li key={index} style={{ fontSize: '0.9rem', color: '#555' }}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarApp;

