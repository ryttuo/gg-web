import React from 'react';
import { Alert } from '../common/interfaces';
import Link from 'next/link';

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
      <h3 className="font-bold text-lg mb-2">{alert.name}</h3>
      <div className="space-y-2">
        <p className="text-gray-600">{alert.alert_type}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <Link
          href={`/alert/${alert.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-block"
        >
          View Details
        </Link>
        <button
          onClick={() => onDelete(alert.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
