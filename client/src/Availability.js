import React from 'react';
import { Card } from 'antd';

const gridStyle: React.CSSProperties = {
  width: '16.66%', // Adjusted to fit 6 columns
  textAlign: 'center',
};

const Availability: React.FC = () => {
  // Example availability data
  const availabilityData = [
    ['10am-11am', true, true, false, true, true, true],
    ['11am-12pm', true, false, true, true, false, true],
    ['12pm-1pm', false, true, true, true, true, false],
    ['1pm-2pm', true, true, true, true, true, true],
  ];

  return (
    <Card title="Availability">
      {availabilityData.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((availability, colIndex) => (
            <Card.Grid
              key={`${rowIndex}-${colIndex}`}
              style={{
                ...gridStyle,
                backgroundColor: availability ? 'green' : 'red',
              }}
            >
              {rowIndex === 0 && colIndex === 0 ? 'Time' : row[0]}
            </Card.Grid>
          ))}
        </div>
      ))}
    </Card>
  );
};

export default Availability;
