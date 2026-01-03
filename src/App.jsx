import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import SalaryChart from './components/SalaryChart';
import { calculateCTCBreakdown } from './utils/taxCalculations';

function App() {
  const [results, setResults] = useState(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState(null);
  
  const { register, watch, setValue } = useForm({
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
    setError(null);
    
    // Validation
    if (!ctc || ctc <= 0) {
      setError('Please enter a valid CTC amount (greater than 0)');
      setResults(null);
      return;
    }
    
    if (ctc < 100000) {
      setError('CTC should be at least ₹1,00,000');
      setResults(null);
      return;
    }
    
    if (ctc > 100000000) {
      setError('CTC seems unreasonably high. Please check your input.');
      setResults(null);
      return;
    }
    
    try {
      setIsCalculating(true);
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
      // Open modal on mobile/tablet (< 1024px)
      if (window.innerWidth < 1024) {
        setShowResultsModal(true);
      }
    } catch (err) {
      setError('An error occurred during calculation. Please try again.');
      setResults(null);
      console.error('Calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  }, [ctc, isOldRegime, state, rentPaid, isMetro, financialYear]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowResultsModal(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showResultsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showResultsModal]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            CTC Tracker
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Calculate your in-hand salary with Indian tax regime
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <InputPanel 
              register={register}
              values={formValues}
              setValue={setValue}
              onCalculate={handleCalculate}
              isCalculating={isCalculating}
              error={error}
            />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6 hidden lg:block">
            {results ? (
              <>
                <ResultsPanel results={results} />
                <SalaryChart results={results} />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-12 text-center animate-fade-in">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  Enter Your CTC to Get Started
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Fill in your annual CTC and other details to see your salary breakdown
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Sheet Modal */}
        {showResultsModal && results && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setShowResultsModal(false)}
            />
            
            {/* Bottom Sheet */}
            <div className="fixed inset-x-0 bottom-0 top-0 z-50 lg:hidden flex flex-col bg-white animate-slide-up overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                <button
                  onClick={() => setShowResultsModal(false)}
                  className="flex items-center text-blue-600 font-semibold"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Edit
                </button>
                <button
                  onClick={() => setShowResultsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="p-4 space-y-4">
                  <ResultsPanel results={results} />
                  <SalaryChart results={results} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
