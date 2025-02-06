'use client';

import { use, useEffect, useState } from 'react';
import { Alert } from '../../common/interfaces';
import { AlertService } from '../../services/alert.service';
import Link from 'next/link';

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
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
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
              <input
                type="text"
                name="alert_type"
                value={formData.alert_type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
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
              <Link
                href="/"
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {resolvedParams.id === 'new' ? 'Create Alert' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6">{alert?.name}</h1>
        
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Type:</label>
            <p>{alert?.alert_type}</p>
          </div>
          
          <div>
            <label className="font-semibold">Status:</label>
            <p>{alert?.status ? 'Active' : 'Inactive'}</p>
          </div>
          
          <div>
            <label className="font-semibold">Description:</label>
            <p>{alert?.description}</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/"
              className="inline-block bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors mt-4"
            >
              Back to Home
            </Link>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors mt-4"
            >
              Edit Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
