import React, { useState, ChangeEvent } from 'react';

interface CompanySettings {
  phone: string;
}

const PhoneInputComponent: React.FC = () => {
  const [companySettings, setCompanySettings] = useState<CompanySettings>({ phone: '' });
  const [phoneError, setPhoneError] = useState<string>('');

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Allow only digits
    const onlyNums = input.replace(/[^0-9]/g, '');

    if (input !== onlyNums) {
      setPhoneError('Only numeric characters are allowed.');
      return;
    }

    setPhoneError('');
    setCompanySettings(prev => ({ ...prev, phone: onlyNums }));
  };

  return (
    <div>
      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        type="tel"
        inputMode="numeric"
        value={companySettings.phone}
        onChange={handlePhoneChange}
      />
      {phoneError && (
        <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '4px' }}>
          {phoneError}
        </p>
      )}
    </div>
  );
};

export default PhoneInputComponent;
