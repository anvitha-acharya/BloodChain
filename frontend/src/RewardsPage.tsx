import React, { useState } from 'react';
import { Card } from './components/UI/Card';

const mockUserPoints = 250;

interface Reward {
  id: string;
  name: string;
  pointsRequired: number;
  icon: string;
}

const mockRewardsCatalog: Reward[] = [
  { id: 'r001', name: 'Movie Ticket Voucher', pointsRequired: 100, icon: '🎟️' },
  { id: 'r002', name: 'Cafe Coffee Coupon', pointsRequired: 150, icon: '☕' },
  { id: 'r003', name: 'Online Course Discount (10%)', pointsRequired: 200, icon: '🎓' },
  { id: 'r004', name: 'Bookstore Gift Card ($10)', pointsRequired: 250, icon: '📚' },
  { id: 'r005', name: 'Charity Donation in Your Name', pointsRequired: 300, icon: '💖' },
  { id: 'r006', name: 'Fitness Class Pass', pointsRequired: 400, icon: '💪' },
];

export default function RewardsPage() {
  const [userPoints, setUserPoints] = useState(mockUserPoints);
  const [redeemedItems, setRedeemedItems] = useState<Reward[]>([]);

  const handleRedeem = (reward: Reward) => {
    if (userPoints >= reward.pointsRequired) {
      setUserPoints(userPoints - reward.pointsRequired);
      setRedeemedItems([...redeemedItems, reward]);
      alert(`Successfully redeemed ${reward.name}!`);
    } else {
      alert("You don't have enough points to redeem this item.");
    }
  };

  return (
    <Card>
      <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Rewards Center</h1>
      <div style={{
        background: 'var(--primary)',
        color: 'white',
        padding: '1rem',
        borderRadius: 'var(--border-radius)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '1.1rem' }}>Your Available Points:</p>
        <p style={{ margin: '0.2rem 0 0', fontSize: '2.5rem', fontWeight: 'bold' }}>{userPoints} PTS</p>
      </div>

      <h2 style={{ color: '#555', marginBottom: '1.5rem', fontSize: '1.4rem' }}>Redeem Your Points:</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {mockRewardsCatalog.map((reward) => (
          <div key={reward.id} style={{
            border: '1px solid #eee',
            borderRadius: 'var(--border-radius)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{reward.icon}</div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', margin: '0 0 0.5rem 0' }}>{reward.name}</h3>
            <p style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0.5rem 0 1rem 0' }}>{reward.pointsRequired} Points</p>
            <button
              className="btn"
              onClick={() => handleRedeem(reward)}
              disabled={userPoints < reward.pointsRequired}
              style={{
                width: '100%',
                background: userPoints < reward.pointsRequired ? '#ccc' : 'var(--primary)',
                cursor: userPoints < reward.pointsRequired ? 'not-allowed' : 'pointer'
              }}
            >
              {userPoints < reward.pointsRequired ? 'Not Enough Points' : 'Redeem'}
            </button>
          </div>
        ))}
      </div>

      {redeemedItems.length > 0 && (
        <div style={{marginTop: '3rem'}}>
            <h2 style={{ color: '#555', marginBottom: '1rem', fontSize: '1.2rem' }}>Recently Redeemed:</h2>
            <ul style={{listStyle: 'none', padding: 0}}>
                {redeemedItems.map((item, index) => (
                    <li key={index} style={{background: '#f9f9f9', padding: '0.75rem', borderRadius: '4px', marginBottom: '0.5rem'}}>
                        {item.icon} {item.name} - {item.pointsRequired} points
                    </li>
                ))}
            </ul>
        </div>
      )}
    </Card>
  );
}