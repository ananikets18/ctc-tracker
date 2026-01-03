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
      ctc: '',
      isOldRegime: true,
      state: 'Maharashtra',
      rentPaid: '',
      isMetro: false,
      financialYear: '2025-26'
    }
  });

  const ctc = watch('ctc');
  const isOldRegime = watch('isOldRegime');
  const state = watch('state');
  const rentPaid = watch('rentPaid');
  const isMetro = watch('isMetro');
  const financialYear = watch('financialYear');

  const formValues = {
    ctc,
    isOldRegime,
    state,
    rentPaid,
    isMetro,
    financialYear
  };

  const handleCalculate = useCallback(() => {
    if (ctc && ctc > 0) {
      const calculationResults = calculateCTCBreakdown(
        Number(ctc),
        {
          isOldRegime: isOldRegime,
          state: state,
          rentPaid: Number(rentPaid) || 0,
          isMetro: isMetro,
          financialYear: financialYear
        }
      );
      setResults(calculationResults);
    } else {
      setResults(null);
    }
  }, [ctc, isOldRegime, state, rentPaid, isMetro, financialYear]);

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
              values={formValues}
              setValue={setValue}
              onCalculate={handleCalculate}
            />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                <ResultsPanel results={results} />
                <SalaryChart results={results} />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Enter Your CTC to Get Started
                </h3>
                <p className="text-gray-500">
                  Fill in your annual CTC and other details to see your salary breakdown
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
