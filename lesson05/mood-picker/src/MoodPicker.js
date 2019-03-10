import React from 'react';

const MOODS = ['happy', 'content', 'bored', 'annoyed', 'angry'];

const MoodPicker = ({ name, currentMood, onChange, ...props }) => (
  <div {...props}>
    {MOODS.map((mood) => (
      <label key={mood}>
        <input
          checked={currentMood === mood}
          type="radio"
          name={name}
          onChange={() => onChange(mood)}
        />
        {mood}
      </label>
    ))}
  </div>
);

export default MoodPicker;
