import React, { useState } from 'react';
import { Card } from './App'; // Assuming Card is exported from App.tsx or a components file

// Mock available slots (in a real app, this would come from an API)
const availableSlots = [
  { date: '2025-06-10', time: '10:00 AM', location: 'City Hospital Center' },
  { date: '2025-06-10', time: '02:00 PM', location: 'Community Blood Drive' },
  { date: '2025-06-12', time: '09:00 AM', location: 'Red Cross Center' },
  { date: '2025-06-12', time: '04:00 PM', location: 'City Hospital Center' },
  { date: '2025-06-15', time: '11:00 AM', location: 'Community Blood Drive' },
];

export default function ScheduleDonationPage() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setIsConfirmed(false); // Reset confirmation if a new slot is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSlot) {
      // Simulate booking confirmation
      setIsConfirmed(true);
      alert(`Donation scheduled for ${selectedSlot.date} at ${selectedSlot.time} at ${selectedSlot.location}.`);
    } else {
      alert('Please select a donation slot.');
    }
  };

  if (isConfirmed && selectedSlot) {
    return (
      <Card>
        <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Appointment Confirmed!</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          Your blood donation is scheduled for:
        </p>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {selectedSlot.date} at {selectedSlot.time}
        </p>
        <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
          Location: {selectedSlot.location}
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Thank you for your commitment! You will receive a confirmation email shortly.
        </p>
        <button className="btn" onClick={() => { setIsConfirmed(false); setSelectedSlot(null); }}>
          Schedule Another Donation
        </button>
      </Card>
    );
  }

  return (
    <Card>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Schedule Your Donation</h1>
      <form onSubmit={handleSubmit}>
        <h2 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>Available Slots:</h2>
        {availableSlots.length > 0 ? (
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #eee', borderRadius: 'var(--border-radius)', padding: '0.5rem' }}>
            {availableSlots.map((slot, index) => (
              <div
                key={index}
                onClick={() => handleSlotSelect(slot)}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  backgroundColor: selectedSlot === slot ? 'var(--secondary)' : 'transparent',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                  transition: 'background-color 0.2s'
                }}
              >
                <p style={{ fontWeight: 'bold', margin: 0 }}>{slot.date} - {slot.time}</p>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', color: '#666' }}>{slot.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No available slots at the moment. Please check back later.</p>
        )}

        {selectedSlot && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f9f9f9', borderRadius: 'var(--border-radius)' }}>
            <h3 style={{color: 'var(--primary)', margin: '0 0 0.5rem 0'}}>Selected Slot:</h3>
            <p><strong>Date:</strong> {selectedSlot.date}</p>
            <p><strong>Time:</strong> {selectedSlot.time}</p>
            <p><strong>Location:</strong> {selectedSlot.location}</p>
          </div>
        )}

        <button
          type="submit"
          className="btn"
          style={{ width: '100%', marginTop: '2rem', padding: '12px' }}
          disabled={!selectedSlot}
        >
          Confirm Appointment
        </button>
      </form>
    </Card>
  );
}
