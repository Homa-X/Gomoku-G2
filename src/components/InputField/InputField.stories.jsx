import React from 'react';
import InputField from '.';
import { useState } from 'react';

export default {
  title: 'Components/InputField',
  component: InputField,
  argTypes: { onChange: { action: 'changed' } },
  args: { label: 'Spelarens namn', placeholder: 'Skriv ditt namn', disabled: false },
};

export const Default = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <InputField
        {...args}
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          args.onChange?.(e);
        }}
      />
    );
  },
};

export const Disabled = { args: { disabled: true } };
