import React from 'react';
import { Alert, AlertType } from '../common/interfaces';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Title } from './ui/Title';
import { AlertIcon } from './ui/AlertIcon';

export const AlertCard: React.FC<{
  alert: Alert;
  onDelete: (id: number) => void;
}> = ({ alert, onDelete }) => {
  return (
    <div
      className={`bg-gray-100 rounded-lg p-4 shadow-sm w-[320px] ${
        alert.status ? 'border-2 border-green-500 bg-green-100' : ''
      }`}
    >
      <Title text={alert.name} size="medium" />
      <div className="space-y-2">
        <AlertIcon alertType={alert.alert_type as AlertType} />
      </div>
      <div className="flex gap-2 mt-4">
        <Link href={`/alert/${alert.id}`}>
          <Button variant="primary">View Details</Button>
        </Link>
        <Button
          onClick={() => onDelete(alert.id)}
          variant="secondary"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
