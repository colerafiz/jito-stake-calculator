import React from 'react';
import { InfoTooltip } from './InfoTooltip';

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  tooltip: string;
  type?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  tooltip,
  type = 'number',
  min,
  max,
  step,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <InfoTooltip content={tooltip} />
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
      />
    </div>
  );
};