interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue = 200 }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 capitalize">
          {label.replace('-', ' ')}
        </span>
        <span className="text-sm text-gray-600">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
