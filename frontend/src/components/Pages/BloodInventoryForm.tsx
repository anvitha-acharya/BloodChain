import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';

interface BloodUnit {
  id: string;
  bloodType: string;
  donationDate: string;
  expiryDate: string;
  status: 'Available' | 'Reserved' | 'Used' | 'Expired';
  donorId: string;
  location: string;
  testStatus: 'Pending' | 'Passed' | 'Failed';
}

interface InventoryUpdate {
  unitId: string;
  action: 'reserve' | 'use' | 'expire' | 'return';
  reason: string;
  updatedBy: string;
}

// Mock blood inventory data
const mockInventory: BloodUnit[] = [
  {
    id: 'BU001',
    bloodType: 'O+',
    donationDate: '2024-12-15',
    expiryDate: '2025-01-14',
    status: 'Available',
    donorId: 'DON001',
    location: 'Main Storage - A1',
    testStatus: 'Passed'
  },
  {
    id: 'BU002',
    bloodType: 'A+',
    donationDate: '2024-12-10',
    expiryDate: '2025-01-09',
    status: 'Reserved',
    donorId: 'DON002',
    location: 'Main Storage - B2',
    testStatus: 'Passed'
  },
  {
    id: 'BU003',
    bloodType: 'B-',
    donationDate: '2024-12-20',
    expiryDate: '2025-01-19',
    status: 'Available',
    donorId: 'DON003',
    location: 'Emergency Storage - C1',
    testStatus: 'Passed'
  },
  {
    id: 'BU004',
    bloodType: 'AB+',
    donationDate: '2024-11-25',
    expiryDate: '2024-12-25',
    status: 'Expired',
    donorId: 'DON004',
    location: 'Main Storage - A3',
    testStatus: 'Passed'
  }
];

const bloodTypeOptions = [
  { value: '', label: 'All Blood Types' },
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'Available', label: 'Available' },
  { value: 'Reserved', label: 'Reserved' },
  { value: 'Used', label: 'Used' },
  { value: 'Expired', label: 'Expired' },
];

const actionOptions = [
  { value: '', label: 'Select Action' },
  { value: 'reserve', label: 'Reserve Unit' },
  { value: 'use', label: 'Mark as Used' },
  { value: 'expire', label: 'Mark as Expired' },
  { value: 'return', label: 'Return to Available' },
];

const getStatusColor = (status: string) => {
  const colors = {
    'Available': '#28a745',
    'Reserved': '#ffc107',
    'Used': '#6c757d',
    'Expired': '#dc3545'
  };
  return colors[status as keyof typeof colors] || '#6c757d';
};

const getDaysUntilExpiry = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function BloodInventoryForm() {
  const [inventory, setInventory] = useState<BloodUnit[]>(mockInventory);
  const [filterBloodType, setFilterBloodType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchId, setSearchId] = useState('');
  
  // Update form state
  const [selectedUnit, setSelectedUnit] = useState<BloodUnit | null>(null);
  const [updateAction, setUpdateAction] = useState('');
  const [updateReason, setUpdateReason] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Filter inventory based on search criteria
  const filteredInventory = inventory.filter(unit => {
    const matchesBloodType = !filterBloodType || unit.bloodType === filterBloodType;
    const matchesStatus = !filterStatus || unit.status === filterStatus;
    const matchesSearch = !searchId || unit.id.toLowerCase().includes(searchId.toLowerCase()) || 
                         unit.donorId.toLowerCase().includes(searchId.toLowerCase());
    return matchesBloodType && matchesStatus && matchesSearch;
  });

  // Calculate inventory statistics
  const stats = {
    total: inventory.length,
    available: inventory.filter(u => u.status === 'Available').length,
    reserved: inventory.filter(u => u.status === 'Reserved').length,
    expiringSoon: inventory.filter(u => getDaysUntilExpiry(u.expiryDate) <= 7 && u.status !== 'Expired').length,
    expired: inventory.filter(u => u.status === 'Expired').length,
  };

  const handleUnitUpdate = (unit: BloodUnit) => {
    setSelectedUnit(unit);
    setShowUpdateForm(true);
    setUpdateAction('');
    setUpdateReason('');
  };

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUnit || !updateAction || !updateReason.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Update the inventory
    const updatedInventory = inventory.map(unit => {
      if (unit.id === selectedUnit.id) {
        let newStatus = unit.status;
        
        switch (updateAction) {
          case 'reserve':
            newStatus = 'Reserved';
            break;
          case 'use':
            newStatus = 'Used';
            break;
          case 'expire':
            newStatus = 'Expired';
            break;
          case 'return':
            newStatus = 'Available';
            break;
        }
        
        return { ...unit, status: newStatus };
      }
      return unit;
    });

    setInventory(updatedInventory);
    setShowUpdateForm(false);
    setSelectedUnit(null);
    setUpdateAction('');
    setUpdateReason('');
    
    alert(`Unit ${selectedUnit.id} has been updated successfully.`);
  };

  const handleCancelUpdate = () => {
    setShowUpdateForm(false);
    setSelectedUnit(null);
    setUpdateAction('');
    setUpdateReason('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Inventory Statistics */}
      <Card style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Blood Inventory Management</h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.total}</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Units</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#d4edda', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>{stats.available}</div>
            <div style={{ fontSize: '0.9rem', color: '#155724' }}>Available</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#856404' }}>{stats.reserved}</div>
            <div style={{ fontSize: '0.9rem', color: '#856404' }}>Reserved</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#ffeaa7', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d68910' }}>{stats.expiringSoon}</div>
            <div style={{ fontSize: '0.9rem', color: '#d68910' }}>Expiring Soon</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8d7da', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#721c24' }}>{stats.expired}</div>
            <div style={{ fontSize: '0.9rem', color: '#721c24' }}>Expired</div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#555', marginBottom: '1rem' }}>Filter Inventory</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Select
            label="Blood Type"
            value={filterBloodType}
            onChange={(e) => setFilterBloodType(e.target.value)}
            options={bloodTypeOptions}
          />
          <Select
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={statusOptions}
          />
          <Input
            label="Search by Unit ID or Donor ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter ID to search"
          />
        </div>
      </Card>

      {/* Update Form Modal */}
      {showUpdateForm && selectedUnit && (
        <Card style={{ 
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          maxWidth: '500px',
          width: '90%'
        }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
            Update Unit: {selectedUnit.id}
          </h2>
          
          <form onSubmit={handleSubmitUpdate}>
            <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <p><strong>Blood Type:</strong> {selectedUnit.bloodType}</p>
              <p><strong>Current Status:</strong> <span style={{ color: getStatusColor(selectedUnit.status) }}>
                {selectedUnit.status}
              </span></p>
              <p><strong>Location:</strong> {selectedUnit.location}</p>
              <p><strong>Expires:</strong> {selectedUnit.expiryDate} 
                ({getDaysUntilExpiry(selectedUnit.expiryDate)} days)
              </p>
            </div>

            <Select
              label="Action *"
              value={updateAction}
              onChange={(e) => setUpdateAction(e.target.value)}
              options={actionOptions}
              required
            />

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#555'
              }}>
                Reason for Update *
              </label>
              <textarea
                value={updateReason}
                onChange={(e) => setUpdateReason(e.target.value)}
                placeholder="Enter reason for this update"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  minHeight: '80px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleCancelUpdate}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #ccc',
                  background: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{
                  padding: '10px 20px',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Update Unit
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Backdrop for modal */}
      {showUpdateForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
          onClick={handleCancelUpdate}
        />
      )}

      {/* Inventory Table */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: '#555', margin: 0 }}>
            Blood Units ({filteredInventory.length} of {inventory.length})
          </h2>
        </div>

        {filteredInventory.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--primary)', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Unit ID</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Blood Type</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Location</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Donation Date</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Expiry Date</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Days to Expiry</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((unit) => {
                  const daysToExpiry = getDaysUntilExpiry(unit.expiryDate);
                  const isExpiringSoon = daysToExpiry <= 7 && unit.status !== 'Expired';
                  
                  return (
                    <tr 
                      key={unit.id} 
                      style={{ 
                        borderBottom: '1px solid #eee',
                        background: isExpiringSoon ? '#fff3cd' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '0.75rem 0.5rem', fontWeight: 'bold' }}>{unit.id}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span style={{
                          background: 'var(--primary)',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          fontSize: '0.9rem'
                        }}>
                          {unit.bloodType}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <span style={{
                          background: getStatusColor(unit.status),
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {unit.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.9rem' }}>{unit.location}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>{unit.donationDate}</td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>{unit.expiryDate}</td>
                      <td style={{ 
                        padding: '0.75rem 0.5rem',
                        color: daysToExpiry <= 0 ? '#dc3545' : daysToExpiry <= 7 ? '#d68910' : '#28a745',
                        fontWeight: daysToExpiry <= 7 ? 'bold' : 'normal'
                      }}>
                        {daysToExpiry <= 0 ? 'Expired' : `${daysToExpiry} days`}
                        {isExpiringSoon && <span style={{ fontSize: '0.7rem', marginLeft: '0.5rem' }}>⚠️</span>}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem' }}>
                        <button
                          onClick={() => handleUnitUpdate(unit)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.8rem',
                            border: '1px solid var(--primary)',
                            background: 'transparent',
                            color: 'var(--primary)',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            No blood units found matching your search criteria.
          </p>
        )}
      </Card>

      {/* Alerts for expiring units */}
      {stats.expiringSoon > 0 && (
        <Card style={{ 
          marginTop: '2rem',
          background: '#fff3cd',
          border: '1px solid #ffeaa7'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <div>
              <h3 style={{ margin: 0, color: '#856404' }}>
                Attention: {stats.expiringSoon} unit{stats.expiringSoon > 1 ? 's' : ''} expiring soon!
              </h3>
              <p style={{ margin: '0.5rem 0 0', color: '#856404' }}>
                Please prioritize these units for distribution or consider processing them for components.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}