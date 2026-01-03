# 💰 CTC Tracker

A modern, responsive web application to calculate your **in-hand salary from CTC** with accurate Indian tax calculations.

![CTC Tracker](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)

## ✨ Features

- 📊 **Comprehensive Salary Breakdown** - Annual, Monthly, and Daily in-hand calculations
- 💼 **Multiple Tax Regimes** - Support for both Old and New tax regimes
- 📅 **Multi-Year Support** - FY 2024-25, 2025-26, 2026-27 with official tax slabs
- 🏛️ **State-wise Professional Tax** - Accurate PT calculations for all Indian states
- 🏠 **HRA Exemption Calculator** - Metro/Non-metro differentiation
- 📱 **Mobile-First Design** - Responsive with bottom sheet modal for mobile
- 🎯 **Smart Regime Comparison** - Automatically shows which regime saves you more
- 💡 **Interactive Tooltips** - Helpful explanations for every field
- ⚡ **Real-time Validation** - Input validation with user-friendly error messages
- 🎨 **Smooth Animations** - Fade-in effects and staggered animations

## 🚀 Tech Stack

- **React 19** - Latest React with modern hooks
- **Vite 7** - Lightning-fast build tool
- **TailwindCSS v4** - Modern utility-first CSS
- **React Hook Form** - Performant form management
- **Recharts** - Beautiful, responsive charts
- **Numeral.js** - Number formatting
- **Date-fns** - Date utilities

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ctc-tracker.git

# Navigate to project directory
cd ctc-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📊 Tax Calculations

### Official Income Tax Slabs (FY 2025-26)

**New Regime:**
- ₹0 - ₹4L: 0%
- ₹4L - ₹8L: 5%
- ₹8L - ₹12L: 10%
- ₹12L - ₹16L: 15%
- ₹16L - ₹20L: 20%
- ₹20L - ₹24L: 25%
- Above ₹24L: 30%

**Old Regime:**
- ₹0 - ₹2.5L: 0%
- ₹2.5L - ₹5L: 5%
- ₹5L - ₹10L: 20%
- Above ₹10L: 30%

### Deductions & Exemptions
- Standard Deduction: ₹75,000 (FY 2025-26 onwards)
- Section 87A Rebate: Up to ₹60,000 (income ≤ ₹7L)
- HRA Exemption: Available in Old Regime only
- Professional Tax: State-wise (₹0 - ₹2,400/year)
- Health & Education Cess: 4% on income tax

## 📱 Features Breakdown

### Input Panel
- CTC Amount with validation (₹1L - ₹10Cr)
- Financial Year selection dropdown
- Tax Regime toggle (Old/New)
- State selection for Professional Tax
- Metro city checkbox
- Monthly rent input (Old Regime only)

### Results Panel
- 3 salary cards (Annual, Monthly, Daily)
- Complete salary components breakdown
- Detailed deductions display
- Regime comparison banner
- Summary with total CTC and in-hand

### Salary Chart
- Interactive pie chart
- Color-coded segments
- Percentage breakdown
- Take-home vs deductions cards

## 🎨 UI/UX Features

- **Responsive Design** - Works on all screen sizes
- **Bottom Sheet Modal** - Mobile-optimized results view
- **Fade-in Animations** - Smooth entry transitions
- **Staggered Children** - Sequential card animations
- **Interactive Tooltips** - Context-aware help
- **Loading States** - Visual feedback during calculation
- **Error Handling** - User-friendly validation messages
- **Keyboard Accessible** - Full keyboard navigation support

## 📁 Project Structure

```
ctc-tracker/
├── src/
│   ├── components/
│   │   ├── InputPanel.jsx      # Input form with validation
│   │   ├── ResultsPanel.jsx    # Salary breakdown display
│   │   ├── SalaryChart.jsx     # Pie chart visualization
│   │   └── Tooltip.jsx         # Reusable tooltip component
│   ├── utils/
│   │   └── taxCalculations.js  # Tax calculation engine
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles & animations
├── public/
│   └── vite.svg               # Favicon
├── index.html                 # HTML template
├── package.json              # Dependencies
├── vite.config.js           # Vite configuration
├── postcss.config.js        # PostCSS configuration
└── eslint.config.js         # ESLint rules
```

## 🔧 Configuration

### Vite Config
- React plugin with Fast Refresh
- Optimized build output

### Tailwind Config
- Custom animations
- CSS-based v4 configuration
- Inter font family

### PostCSS
- TailwindCSS plugin
- Autoprefixer for browser compatibility

## 🚢 Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The production build will be optimized and minified in the `dist/` folder.

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using React + Vite + TailwindCSS**
