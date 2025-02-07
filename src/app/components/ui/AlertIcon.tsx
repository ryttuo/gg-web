import { AlertType } from "@/app/common/interfaces";

export const AlertIcon = ({ alertType }: { alertType: AlertType }) => {
  const getIcon = (type: AlertType) => {
    switch (type) {
      case 'guard':
        return '👮';
      case 'time':
        return '⏰';
      case 'misbehavior':
        return '⚠️';
      case 'altercation':
        return '🤼';
      case 'suspicious':
        return '🔍';
      case 'other':
        return '❓';
      default:
        return '❓';
    }
  };

  return (
    <p className="text-gray-600 flex items-center gap-2">
      <span className="text-2xl">{getIcon(alertType)}</span>
    </p>
  );
};
