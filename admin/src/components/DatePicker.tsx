import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css';
import { Turkish } from 'flatpickr/dist/l10n/tr.js';
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder }) => (
  <Flatpickr
    className="form-control"
    options={{
      dateFormat: 'Y-m-d',
      locale: Turkish,
      allowInput: true,
      altInput: true,
      altFormat: 'F j, Y',
      plugins: [
        confirmDatePlugin({
          showAlways: false,
          confirmText: 'Seç',
        //   clearText: 'Temizle',
        //   showClear: true,
        }),
      ],
      static: true,
    }}
    value={value}
    placeholder={placeholder}
    onChange={([date]) =>
      onChange(date ? date.toISOString().slice(0, 10) : '')
    }
  />
);

export default DatePicker; 