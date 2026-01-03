import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import SalaryChart from './components/SalaryChart';
import { calculateCTCBreakdown } from './utils/taxCalculations';

function App() {
  const [results, setResults] = useState(null);
  
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      ctc: 1200000,
      isOldRegime: true,
      state: 'Maharashtra',
      rentPaid: 0,
      isMetro: true,
      financialYear: '2025-26'
    }
  });

  const ctc = watch('ctc');
  const isOldRegime = watch('isOldRegime');
  const state = watch('state');
  const rentPaid = watch('rentPaid');
  const isMetro = watch('isMetro');

  const handleCalculate = useCallback(() => {
    const formValues = getValues();
    if (formValues.ctc > 0) {
      const calculationResults = calculateCTCBreakdown(
        Number(formValues.ctc),
        {
          isOldRegime: formValues.isOldRegime,
          state: formValues.state,
          rentPaid: Number(formValues.rentPaid),
          isMetro: formValues.isMetro
        }
      );
      setResults(calculationResults);
    }
  }, [getValues, ctc, isOldRegime, state, rentPaid, isMetro]);

  // Auto-calculate on form change
  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            CTC Tracker
          </h1>
          <p className="text-gray-600">
            Calculate your in-hand salary with Indian tax regime
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <InputPanel 
              register={register}
              values={getValues()}
              setValue={setValue}
              onCalculate={handleCalculate}
            />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                <ResultsPanel results={results} />
                <SalaryChart results={results} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
