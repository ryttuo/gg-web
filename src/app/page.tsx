'use client';

import { useEffect, useState } from "react";
import { AlertCard } from "./components/AlertCard";
import { useAppState } from "./context/appStateContext";
import { AlertService } from "./services/alert.service";
import { Alert } from "./common/interfaces";

export default function Home() {
  const { user } = useAppState();

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertToDelete, setAlertToDelete] = useState<Alert | null>(null);
  const alertService = new AlertService();

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const alertData = await alertService.getAlerts();
        setAlerts(alertData);
      } catch (error) {
        console.error('Failed to load alerts:', error);
      }
    };

    loadAlerts();
  }, []);

  const handleDelete = async (id: number) => {
    const alert = alerts.find(a => a.id === id);
    if (!alert) return;
    
    setAlertToDelete(alert);
    const confirmed = window.confirm(`Are you sure you want to delete alert "${alert.name}"?`);
    
    if (confirmed) {
      try {
        await alertService.deleteAlert(id);
        setAlerts(alerts.filter(alert => alert.id !== id));
      } catch (error) {
        console.error('Failed to delete alert:', error);
      }
    }
    setAlertToDelete(null);
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {alerts.map((alert: Alert) => (
        <AlertCard 
          key={alert.id}
          alert={alert}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
