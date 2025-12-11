
import React, { useState } from 'react';

interface ToggleSwitchProps {
  defaultChecked?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ defaultChecked = false }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer toggle-switch-bg"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-sky-500 peer-checked:bg-sky-500 transition-colors"></div>
      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full toggle-switch-dot"></span>
    </label>
  );
};
