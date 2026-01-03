import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import numeral from 'numeral';

const CustomTooltip = ({ active, payload, ctc }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow-lg border">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-sm">₹{numeral(payload[0].value).format('0,0')}</p>
        <p className="text-xs text-gray-500">
          {((payload[0].value / ctc) * 100).toFixed(1)}% of CTC
        </p>
      </div>
    );
  }
  return null;
};

const SalaryChart = ({ results }) => {
  // Prepare data for pie chart
  const chartData = [
    {
      name: 'In-Hand Salary',
      value: results.results.annualInHand,
      color: '#10b981'
    },
    {
      name: 'Employee PF',
      value: results.deductions.employeePF,
      color: '#3b82f6'
    },
    {
      name: 'Income Tax',
      value: results.deductions.totalTax,
      color: '#ef4444'
    },
    {
      name: 'Professional Tax',
      value: results.deductions.professionalTax,
      color: '#f59e0b'
    }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Salary Breakdown - CTC vs In-Hand
      </h2>
      
      <div className="w-full" style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip ctc={results.ctc} />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Percentage Breakdown */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Take-Home %</p>
          <p className="text-2xl font-bold text-green-600">
            {((results.results.annualInHand / results.ctc) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Deductions %</p>
          <p className="text-2xl font-bold text-red-600">
            {(((results.ctc - results.results.annualInHand) / results.ctc) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalaryChart;
