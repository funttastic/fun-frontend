import React from 'react';
import Box from "@mui/material/Box";

const data = {
  id: "01",
  wallet: "kujira10uaufamh5lethtxl2l4sunelyngedsy054klf6",
  market: "KUJI/USK",
  strategy: {
    layers: {
      bid: {
        quantity: 2,
        spread: {
          absolute: null,
          percentage: 15
        },
        budget: {
          absolute: 1,
          percentage: 0.1
        }
      },
      ask: {
        quantity: 1,
        spread: {
          absolute: null,
          percentage: 15
        },
        budget: {
          absolute: 1,
          percentage: 0.1
        }
      }
    }
  }
};

const renderInput = (label: string, value: string | number | null) => (
  <div style={{ marginBottom: '10px', color:'black' }}>
    <label>
      {label}:
      <input style={{ borderRadius:'3px'}} type="text" defaultValue={value === null ? '' : value.toString()} />
    </label>
  </div>
);

const MyComponent: React.FC = () => {
  return (
    <Box className="container">
     <div className="container-text">
        {renderInput('id', data.id)}
        {renderInput('wallet', data.wallet)}
        {renderInput('market', data.market)}
        <div>
          <p>strategy:</p>
          <ul>
            <li>layers:</li>
            <ul>
              <li>bid:</li>
              {renderInput('quantity', data.strategy.layers.bid.quantity)}
              <li>spread:</li>
              <ul>
                {renderInput('absolute', data.strategy.layers.bid.spread.absolute)}
                {renderInput('percentage', data.strategy.layers.bid.spread.percentage)}
              </ul>
              <li>budget:</li>
              <ul>
                {renderInput('absolute', data.strategy.layers.bid.budget.absolute)}
                {renderInput('percentage', data.strategy.layers.bid.budget.percentage)}
              </ul>
              <li>ask:</li>
              {renderInput('quantity', data.strategy.layers.ask.quantity)}
              <li>spread:</li>
              <ul>
                {renderInput('absolute', data.strategy.layers.ask.spread.absolute)}
                {renderInput('percentage', data.strategy.layers.ask.spread.percentage)}
              </ul>
              <li>budget:</li>
              <ul>
                {renderInput('absolute', data.strategy.layers.ask.budget.absolute)}
                {renderInput('percentage', data.strategy.layers.ask.budget.percentage)}
              </ul>
            </ul>
          </ul>
        </div>
     </div>
    </Box>
  );
};

export default MyComponent;
