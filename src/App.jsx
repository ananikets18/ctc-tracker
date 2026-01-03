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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-3 sm:px-4 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              CTC Tracker
            </h1>
            <a
              href="https://github.com/ananikets18/ctc-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-full transition-colors"
              aria-label="View source on GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>Star</span>
            </a>
          </div>
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
      
      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full mt-8 pt-6 border-t border-gray-200/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4">
          <p className="text-sm text-gray-600">
            Built with <span className="text-red-500">❤</span> by{' '}
            <a
              href="https://github.com/ananikets18"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Aniket
            </a>
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a
              href="https://github.com/ananikets18/ctc-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>
            <span className="text-gray-300">|</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
