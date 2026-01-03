# 💰 CTC Tracker

A modern, responsive web application to calculate your **in-hand salary from CTC** with accurate Indian tax calculations.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)](https://ctc-tracker.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/ananikets18/ctc-tracker)

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-blue)

**🚀 [Try it live at ctc-tracker.vercel.app](https://ctc-tracker.vercel.app/)**

> Built by [Aniket](https://github.com/ananikets18) | [⭐ Star this repo](https://github.com/ananikets18/ctc-tracker) if you find it helpful!

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
git clone https://github.com/ananikets18/ctc-tracker.git

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

**Built with ❤️ by [Aniket](https://github.com/ananikets18) using React + Vite + TailwindCSS**
