import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Input } from '../UI/Input';

interface DonationStatus {
  id: string;
  donorName: string;
  donationDate: string;
  location: string;
  bloodType: string;
  status: 'Scheduled' | 'Collected' | 'Tested' | 'Processed' | 'Available' | 'Used';
  testResults: string;
  expiryDate: string;
  recipientInfo?: string;
}

// Mock donation data
const mockDonations: DonationStatus[] = [
  {
    id: 'DON001',
    donorName: 'John Doe',
    donationDate: '2024-12-15',
    location: 'City Hospital Center',
    bloodType: 'O+',
    status: 'Available',
    testResults: 'All tests passed - Safe for transfusion',
    expiryDate: '2025-01-14',
  },
  {
    id: 'DON002',
    donorName: 'Jane Smith',
    donationDate: '2024-12-10',
    location: 'Community Blood Drive',
    bloodType: 'A+',
    status: 'Used',
    testResults: 'All tests passed - Safe for transfusion',
    expiryDate: '2025-01-09',
    recipientInfo: 'Used for emergency surgery at General Hospital',
  },
  {
    id: 'DON003',
    donorName: 'Mike Johnson',
    donationDate: '2024-12-20',
    location: 'Red Cross Center',
    bloodType: 'B-',
    status: 'Tested',
    testResults: 'Testing in progress',
    expiryDate: '2025-01-19',
  }
];

const getStatusColor = (status: string) => {
  const colors = {
    'Scheduled': '#ffc107',
    'Collected': '#17a2b8',
    'Tested': '#6f42c1',
    'Processed': '#20c997',
    'Available': '#28a745',
    'Used': '#6c757d'
  };
  return colors[status as keyof typeof colors] || '#6c757d';
};

const getStatusProgress = (status: string) => {
  const progressMap = {
    'Scheduled': 16,
    'Collected': 33,
    'Tested': 50,
    'Processed': 66,
    'Available': 83,
    'Used': 100
  };
  return progressMap[status as keyof typeof progressMap] || 0;
};

export default function DonationTrackingForm() {
  const [trackingId, setTrackingId] = useState('');
  const [donationInfo, setDonationInfo] = useState<DonationStatus | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!trackingId.trim()) {
      setError('Please enter a donation ID');
      return;
    }

    // Search for donation
    const found = mockDonations.find(donation => 
      donation.id.toLowerCase() === trackingId.toLowerCase()
    );

    if (found) {
      setDonationInfo(found);
    } else {
      setDonationInfo(null);
      setError('Donation not found. Please check your donation ID and try again.');
    }
  };

  const handleReset = () => {
    setTrackingId('');
    setDonationInfo(null);
    setError('');
  };

  return (
    <Card style={{ maxWidth: '800px' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Track Your Donation</h1>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
          <div style={{ flex: 1 }}>
            <Input
              label="Donation ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your donation ID (e.g., DON001)"
              required
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ 
              padding: '12px 24px',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Track Donation
          </button>
        </div>
      </form>

      {error && (
        <div style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}

      {donationInfo && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--primary)', margin: 0 }}>Donation Details</h2>
            <button 
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: '1px solid #ccc',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Search Another
            </button>
          </div>

          {/* Status Progress Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold' }}>Current Status: </span>
              <span style={{ 
                color: getStatusColor(donationInfo.status),
                fontWeight: 'bold'
              }}>
                {donationInfo.status}
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: '#e9ecef',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${getStatusProgress(donationInfo.status)}%`,
                height: '100%',
                background: getStatusColor(donationInfo.status),
                transition: 'width 0.3s ease'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              <span>Scheduled</span>
              <span>Collected</span>
              <span>Tested</span>
              <span>Processed</span>
              <span>Available</span>
              <span>Used</span>
            </div>
          </div>

          {/* Donation Information */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ color: '#555', marginBottom: '1rem' }}>Donation Information</h3>
              <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
                <p><strong>Donation ID:</strong> {donationInfo.id}</p>
                <p><strong>Donor:</strong> {donationInfo.donorName}</p>
                <p><strong>Date:</strong> {donationInfo.donationDate}</p>
                <p><strong>Location:</strong> {donationInfo.location}</p>
                <p><strong>Blood Type:</strong> <span style={{ 
                  background: 'var(--primary)', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}>{donationInfo.bloodType}</span></p>
              </div>
            </div>

            <div>
              <h3 style={{ color: '#555', marginBottom: '1rem' }}>Test Results & Status</h3>
              <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
                <p><strong>Test Results:</strong></p>
                <p style={{ 
                  color: donationInfo.testResults.includes('passed') ? '#28a745' : '#ffc107',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  {donationInfo.testResults}
                </p>
                <p><strong>Expiry Date:</strong> {donationInfo.expiryDate}</p>
                {donationInfo.recipientInfo && (
                  <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#e7f3ff', borderRadius: '4px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                      <strong>Usage Info:</strong> {donationInfo.recipientInfo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: '#555', marginBottom: '1rem' }}>Status Timeline</h3>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
              {['Scheduled', 'Collected', 'Tested', 'Processed', 'Available', 'Used'].map((status, index) => {
                const isCompleted = getStatusProgress(donationInfo.status) > (index * 16.66);
                const isCurrent = donationInfo.status === status;
                
                return (
                  <div key={status} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: index < 5 ? '0.5rem' : 0,
                    opacity: isCompleted || isCurrent ? 1 : 0.4
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: isCurrent ? getStatusColor(status) : isCompleted ? '#28a745' : '#dee2e6',
                      marginRight: '0.5rem'
                    }} />
                    <span style={{ 
                      fontWeight: isCurrent ? 'bold' : 'normal',
                      color: isCurrent ? getStatusColor(status) : isCompleted ? '#28a745' : '#6c757d'
                    }}>
                      {status}
                    </span>
                    {isCurrent && <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#666' }}>(Current)</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impact Message */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), #ff6b6b)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Thank You for Your Life-Saving Donation! 🩸</h3>
            <p style={{ margin: 0 }}>
              {donationInfo.status === 'Used' 
                ? 'Your donation has helped save a life! Thank you for your generosity.'
                : 'Your donation is making its way through our safety processes and will soon help save lives.'
              }
            </p>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div style={{ 
        background: '#e7f3ff', 
        padding: '1rem', 
        borderRadius: '8px', 
        marginTop: '2rem' 
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#0056b3' }}>Need Help?</h4>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          If you can't find your donation or have questions about the tracking process, 
          please contact our support team at <strong>support@bloodbank.com</strong> or call <strong>1-800-BLOOD-HELP</strong>.
        </p>
      </div>
    </Card>
  );
}