'use client';

import { use, useEffect, useState } from 'react';
import { Alert } from '../../common/interfaces';
import { AlertService } from '../../services/alert.service';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';
import { Title } from '@/app/components/ui/Title';

export default function AlertPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [alert, setAlert] = useState<Alert | null>(null);
  const [isEditing, setIsEditing] = useState(resolvedParams.id === 'new');
  const [formData, setFormData] = useState<Alert | null>(null);
  const alertService = new AlertService();

  useEffect(() => {
    const loadAlert = async () => {
      if (resolvedParams.id === 'new') {
        setFormData({
          id: 0,
          name: '',
          alert_type: '',
          status: false,
          description: '',
        });
        return;
      }

      try {
        const alertData = await alertService.getAlert(parseInt(resolvedParams.id));
        setAlert(alertData);
        setFormData(alertData);
      } catch (error) {
        console.error('Failed to load alert:', error);
      }
    };

    loadAlert();
  }, [resolvedParams.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      [name]: value
    } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    try {
      let updatedAlert;
      if (resolvedParams.id === 'new') {
        updatedAlert = await alertService.createAlert(formData);
      } else {
        updatedAlert = await alertService.updateAlert(formData);
      }
      setAlert(updatedAlert);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save alert:', error);
    }
  };

  if (!alert && resolvedParams.id !== 'new') {
    return <div>Loading...</div>;
  }

  if (isEditing && formData) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-auto">
          {resolvedParams.id === 'new' && (
            <div className="flex justify-center mb-6">
              <Title text="Create New Alert" size="large" />
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-semibold block mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="font-semibold block mb-2">Type:</label>
              <select
                name="alert_type"
                value={formData.alert_type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const { name, value } = e.target;
                  setFormData(prev => prev ? { ...prev, [name]: value } : null);
                }}
                className="w-full p-2 border rounded"
              >
                <option value="guard">👮 Guard</option>
                <option value="time">⏰ Time</option>
                <option value="misbehavior">⚠️ Misbehavior</option>
                <option value="altercation">🤼 Altercation</option>
                <option value="suspicious">🔍 Suspicious</option>
                <option value="other">❓ Other</option>
              </select>
            </div>
            
            <div>
              <label className="font-semibold block mb-2">Status:</label>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={e => setFormData(prev => prev ? {...prev, status: e.target.checked} : null)}
                className="mr-2"
              />
              Active
            </div>
            
            <div>
              <label className="font-semibold block mb-2">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Link href="/">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button type="submit" variant="primary">
                {resolvedParams.id === 'new' ? 'Create Alert' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className={`bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full border-2 mx-auto ${alert?.status ? 'border-green-500' : 'border-gray-200'}`}>
        <Title text={alert?.name || ''} size="large" />
        
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Type:</label>
            <p>{alert?.alert_type}</p>
          </div>
          
          <div>
            <label className="font-semibold">Status:</label>
            <p>
              <span className={`${alert?.status ? 'bg-green-100 border border-green-500 px-2 py-0.5 rounded' : ''}`}>
                {alert?.status ? 'Active' : 'Inactive'}
              </span>
            </p>
          </div>
          
          <div>
            <label className="font-semibold">Description:</label>
            <p>{alert?.description}</p>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
            <Button onClick={() => setIsEditing(true)} variant="primary">
              Edit Alert
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
