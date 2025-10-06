import React from 'react';

export default function InputField({
  id = 'player-name',
  label = 'Spelarens namn',
  placeholder = 'Skriv ditt namn',
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label><br/>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{ padding: '6px 8px', border: '1px solid #ccc', borderRadius: 6 }}
        aria-label={label}
      />
    </div>
  );
}
