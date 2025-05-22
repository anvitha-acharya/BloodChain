import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';

interface BloodRequest {
  patientName: string;
  bloodType: string;
  urgencyLevel: string;
  unitsNeeded: number;
  hospitalName: string;
  contactNumber: string;
  requiredBy: string;
  medicalCondition: string;
  doctorName: string;
  additionalNotes: string;
}

const bloodTypeOptions = [
  { value: '', label: 'Select Blood Type' },
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

const urgencyOptions = [
  { value: '', label: 'Select Urgency Level' },
  { value: 'Critical', label: 'Critical (Within 24 hours)' },
  { value: 'Urgent', label: 'Urgent (Within 3 days)' },
  { value: 'Moderate', label: 'Moderate (Within 1 week)' },
  { value: 'Low', label: 'Low (Within 2 weeks)' },
];

export default function BloodRequestForm() {
  const [formData, setFormData] = useState<BloodRequest>({
    patientName: '',
    bloodType: '',
    urgencyLevel: '',
    unitsNeeded: 1,
    hospitalName: '',
    contactNumber: '',
    requiredBy: '',
    medicalCondition: '',
    doctorName: '',
    additionalNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.patientName || !formData.bloodType || !formData.urgencyLevel || 
        !formData.hospitalName || !formData.contactNumber || !formData.requiredBy) {
      alert('Please fill in all required fields.');
      return;
    }

    // Generate a mock request ID
    const mockRequestId = `BR${Date.now().toString().slice(-6)}`;
    setRequestId(mockRequestId);
    setIsSubmitted(true);
    
    // In a real app, this would send data to the backend
    console.log('Blood request submitted:', formData);
  };

  if (isSubmitted) {
    return (
      <Card>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Request Submitted Successfully!</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Your blood request has been submitted to the system.
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>
            Request ID: {requestId}
          </p>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <p><strong>Patient:</strong> {formData.patientName}</p>
            <p><strong>Blood Type:</strong> {formData.bloodType}</p>
            <p><strong>Units Needed:</strong> {formData.unitsNeeded}</p>
            <p><strong>Urgency:</strong> {formData.urgencyLevel}</p>
            <p><strong>Required By:</strong> {formData.requiredBy}</p>
          </div>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            We will notify you as soon as matching blood becomes available. 
            You can track your request status using the Request ID above.
          </p>
          <button 
            className="btn" 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                patientName: '',
                bloodType: '',
                urgencyLevel: '',
                unitsNeeded: 1,
                hospitalName: '',
                contactNumber: '',
                requiredBy: '',
                medicalCondition: '',
                doctorName: '',
                additionalNotes: '',
              });
            }}
          >
            Submit Another Request
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: '800px' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Blood Request Form</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div>
            <Input
              label="Patient Name *"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              required
              placeholder="Enter patient's full name"
            />
            
            <Select
              label="Blood Type *"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              options={bloodTypeOptions}
              required
            />
            
            <Select
              label="Urgency Level *"
              name="urgencyLevel"
              value={formData.urgencyLevel}
              onChange={handleInputChange}
              options={urgencyOptions}
              required
            />
            
            <Input
              label="Units Needed *"
              name="unitsNeeded"
              type="number"
              value={formData.unitsNeeded}
              onChange={handleInputChange}
              min="1"
              max="10"
              required
            />
          </div>
          
          <div>
            <Input
              label="Hospital Name *"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleInputChange}
              required
              placeholder="Hospital where blood is needed"
            />
            
            <Input
              label="Contact Number *"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
              placeholder="Emergency contact number"
            />
            
            <Input
              label="Required By Date *"
              name="requiredBy"
              type="date"
              value={formData.requiredBy}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
            
            <Input
              label="Doctor Name"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleInputChange}
              placeholder="Attending physician"
            />
          </div>
        </div>
        
        <Input
          label="Medical Condition"
          name="medicalCondition"
          value={formData.medicalCondition}
          onChange={handleInputChange}
          placeholder="Brief description of medical condition"
        />
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: '500',
            color: '#555'
          }}>
            Additional Notes
          </label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            placeholder="Any additional information that might be helpful"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              minHeight: '100px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>
        
        <div style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          borderRadius: '8px', 
          padding: '1rem', 
          marginBottom: '2rem' 
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#856404' }}>
            <strong>Important:</strong> This is an urgent medical request. Please ensure all information is accurate. 
            Our team will process your request immediately and contact you with available options.
          </p>
        </div>
        
        <button
          type="submit"
          className="btn"
          style={{ 
            width: '100%', 
            padding: '16px', 
            fontSize: '18px',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Submit Blood Request
        </button>
      </form>
    </Card>
  );
}