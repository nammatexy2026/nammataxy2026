import React from 'react';

export const InputField = ({ label, icon, ...props }) => (
    <div className="relative">
        <input {...props} className="form-input" />
        {label && (
            <span className="text-[8px] font-black text-primary uppercase absolute -top-1.5 left-3 bg-white px-1 z-10">
                {label}
            </span>
        )}
    </div>
);

export const DateTimePicker = ({ dateValue, onDateChange, timeValue, onTimeChange, dateLabel = "Date", timeLabel = "Time" }) => (
    <div className="flex gap-2">
        <div className="custom-date-wrapper">
            <input 
                type="date" 
                className="form-input" 
                value={dateValue} 
                onChange={e => onDateChange(e.target.value)} 
            />
            {!dateValue && (
                <div className="custom-date-placeholder">
                    <span>{dateLabel}</span>
                </div>
            )}
        </div>
        <div className="custom-date-wrapper">
            <input 
                type="time" 
                className="form-input" 
                value={timeValue} 
                onChange={e => onTimeChange(e.target.value)} 
            />
            {!timeValue && (
                <div className="custom-date-placeholder">
                    <span>{timeLabel}</span>
                </div>
            )}
        </div>
    </div>
);
