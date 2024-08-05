import React, { useEffect, useRef, forwardRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';

interface DatePickerProps {
    value: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    minDate?: Date;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
    value, onChange, placeholder, minDate
}, ref) => {
    const localRef = useRef<HTMLInputElement>(null);
    const fpRef = useRef<flatpickr.Instance | null>(null);

    useEffect(() => {
        if (localRef.current) {
            fpRef.current = flatpickr(localRef.current, {
                dateFormat: "d-m-Y",
                minDate: minDate || new Date(),
                onChange: (selectedDates) => {
                    onChange(selectedDates[0] || null);
                },
            });
        }

        return () => {
            if (fpRef.current) {
                fpRef.current.destroy();
            }
        };
    }, [onChange, minDate]);

    useEffect(() => {
        if (fpRef.current) {
            fpRef.current.setDate(value || '', false);
        }
    }, [value]);

    return (
        <input
            ref={localRef}
            placeholder={placeholder || 'Select Date'}
            className="input w-full max-w-xs"
            type="text"
            readOnly
        />
    );
});

export default DatePicker;