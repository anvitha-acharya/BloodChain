import React from 'react';
import { Card } from './components/UI/Card';

const mockDonorData = {
  name: "John Doe",
  totalDonations: 5,
  rewardPoints: 250,
  nextDonationDate: "2025-07-15",
  bloodType: "O+",
};

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit }) => (
  <div style={{
    background: 'var(--primary)',
    color: 'white',
    padding: '20px',
    borderRadius: 'var(--border-radius)',
    textAlign: 'center',
    minWidth: '150px'
  }}>
    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>
    <div style={{ fontSize: '0.9rem' }}>{title}{unit && <span style={{fontSize: '0.7rem'}}> {unit}</span>}</div>
  </div>
);

export default function DonorDashboard() {
  return (
    <div>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Welcome, {mockDonorData.name}!</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        marginBottom: '2rem'
      }}>
        <StatCard title="Total Donations" value={mockDonorData.totalDonations} />
        <StatCard title="Reward Points" value={mockDonorData.rewardPoints} unit="pts"/>
        <StatCard title="Blood Type" value={mockDonorData.bloodType} />
        <StatCard title="Next Eligible" value={mockDonorData.nextDonationDate} />
      </div>

      <Card style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn">Schedule New Donation</button>
          <button className="btn">View Donation History</button>
          <button className="btn">Explore Rewards</button>
        </div>
      </Card>

      <Card>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Recent Activity</h2>
        <p>No recent activity to display.</p>
        <p style={{marginTop: '1rem', fontSize: '0.9rem', color: '#666'}}>
            Your contributions are vital. Thank you for being a lifesaver!
        </p>
      </Card>
    </div>
  );
}