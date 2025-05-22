import React from 'react';
import { Card } from './components/UI/Card';

const mockDonationHistory = [
  { id: 'd001', date: '2024-12-10', location: 'City Hospital Center', pointsEarned: 50, status: 'Completed' },
  { id: 'd002', date: '2024-08-05', location: 'Community Blood Drive', pointsEarned: 50, status: 'Completed' },
  { id: 'd003', date: '2024-04-01', location: 'Red Cross Center', pointsEarned: 50, status: 'Completed' },
  { id: 'd004', date: '2023-11-20', location: 'City Hospital Center', pointsEarned: 50, status: 'Completed' },
  { id: 'd005', date: '2023-07-15', location: 'Community Blood Drive', pointsEarned: 50, status: 'Completed' },
];

const totalPoints = mockDonationHistory.reduce((sum, donation) => sum + donation.pointsEarned, 0);

const badgeLevels = [
  { points: 50, name: 'Bronze Donor', icon: '🥉' },
  { points: 150, name: 'Silver Donor', icon: '🥈' },
  { points: 250, name: 'Gold Donor', icon: '🥇' },
  { points: 500, name: 'Platinum Donor', icon: '💎' },
];

const getCurrentBadge = (points: number) => {
  let currentBadge = { name: 'New Donor', icon: '🩸' };
  for (let i = badgeLevels.length - 1; i >= 0; i--) {
    if (points >= badgeLevels[i].points) {
      currentBadge = badgeLevels[i];
      break;
    }
  }
  return currentBadge;
};

const currentBadge = getCurrentBadge(totalPoints);

export default function DonationHistoryPage() {
  return (
    <Card>
      <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Donation History</h1>

      <div style={{
        background: 'var(--secondary)',
        padding: '1rem',
        borderRadius: 'var(--border-radius)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem'}}>{currentBadge.icon}</div>
        <h2 style={{ margin: 0, color: 'var(--primary)' }}>{currentBadge.name}</h2>
        <p style={{ margin: '0.5rem 0 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
          Total Reward Points: {totalPoints}
        </p>
      </div>

      <h2 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>Your Past Donations:</h2>
      {mockDonationHistory.length > 0 ? (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--primary)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Location</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Points Earned</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockDonationHistory.map((donation) => (
                <tr key={donation.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{donation.date}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{donation.location}</td>
                  <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>{donation.pointsEarned}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <span style={{
                        background: donation.status === 'Completed' ? '#28a745' : '#ffc107',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                    }}>
                        {donation.status}
                    </span>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No donation history found. Make your first donation today!</p>
      )}
    </Card>
  );
}