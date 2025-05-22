import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Donor' | 'Recipient' | 'Hospital' | 'Admin';
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  lastLogin: string;
  bloodType?: string;
  donationCount?: number;
  hospitalName?: string;
}

interface NewUser {
  name: string;
  email: string;
  role: string;
  bloodType: string;
  hospitalName: string;
  password: string;
  confirmPassword: string;
}

const mockUsers: User[] = [
  { id: 'U001', name: 'John Doe', email: 'john.doe@email.com', role: 'Donor', status: 'Active', joinDate: '2024-01-15', lastLogin: '2024-12-20', bloodType: 'O+', donationCount: 5 },
  { id: 'U002', name: 'Jane Smith', email: 'jane.smith@email.com', role: 'Recipient', status: 'Active', joinDate: '2024-03-10', lastLogin: '2024-12-19', bloodType: 'A+' },
  { id: 'U003', name: 'City Hospital', email: 'admin@cityhospital.com', role: 'Hospital', status: 'Active', joinDate: '2024-02-01', lastLogin: '2024-12-21', hospitalName: 'City Hospital Center' },
  { id: 'U004', name: 'Mike Johnson', email: 'mike.johnson@email.com', role: 'Donor', status: 'Inactive', joinDate: '2024-06-15', lastLogin: '2024-11-30', bloodType: 'B-', donationCount: 2 },
  { id: 'U005', name: 'Sarah Wilson', email: 'sarah.wilson@email.com', role: 'Admin', status: 'Active', joinDate: '2024-01-01', lastLogin: '2024-12-21' }
];

const roleOptions = [
  { value: 'Donor', label: 'Donor' },
  { value: 'Recipient', label: 'Recipient' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'Admin', label: 'Admin' },
];

const bloodTypeOptions = [
  { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
];

export default function UserManagementForm() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEditClick = (user: User) => setEditingUser(user);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!editingUser) return;
    setEditingUser(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    alert('User details updated successfully.');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Management</h1>
      <table border={1} cellPadding={8} style={{ width: '100%', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEditClick(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <Card style={{ padding: '1rem', background: '#f9f9f9', border: '1px solid #ccc' }}>
          <h2>Edit User: {editingUser.name}</h2>
          <form onSubmit={handleEditSubmit}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Input name="name" label="Name" value={editingUser.name} onChange={handleEditChange} required />
              <Input name="email" label="Email" type="email" value={editingUser.email} onChange={handleEditChange} required />
              <Select name="role" label="Role" value={editingUser.role} onChange={handleEditChange} options={roleOptions} />
              {['Donor', 'Recipient'].includes(editingUser.role) && (
                <Select name="bloodType" label="Blood Type" value={editingUser.bloodType || ''} onChange={handleEditChange} options={bloodTypeOptions} />
              )}
              {editingUser.role === 'Hospital' && (
                <Input name="hospitalName" label="Hospital Name" value={editingUser.hospitalName || ''} onChange={handleEditChange} />
              )}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditingUser(null)} style={{ marginLeft: '1rem' }}>Cancel</button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}
