# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-03

### 🎉 Initial Release

First production release of CTC Tracker - A modern salary calculator for Indian tax regime.

### ✨ Features

#### Core Functionality
- **Accurate CTC to In-Hand Calculation** - Calculate exact take-home salary from CTC
- **Multiple Tax Regimes** - Support for both Old and New tax regimes with automatic comparison
- **Multi-Year Support** - FY 2024-25, 2025-26, and 2026-27 with official Income Tax Department slabs
- **State-wise Professional Tax** - Accurate calculations for all Indian states
- **HRA Exemption Calculator** - Metro/Non-metro city differentiation with rent input

#### User Interface
- **Mobile-First Design** - Fully responsive layout optimized for all devices
- **Bottom Sheet Modal** - Mobile-optimized results display (< 1024px)
- **Smooth Animations** - Fade-in effects, slide-up animations, and staggered children
- **Interactive Tooltips** - 13+ contextual help tooltips explaining calculations
- **Loading States** - Visual feedback during calculations
- **Error Handling** - User-friendly validation messages

#### Visualizations
- **Salary Breakdown Chart** - Interactive pie chart showing CTC distribution
- **Percentage Cards** - Take-home vs deductions at a glance
- **Three Salary Views** - Annual, Monthly, and Daily in-hand amounts
- **Regime Comparison Banner** - Automatic suggestion for better tax regime

#### Calculations Include
- Basic Salary (48% of CTC)
- HRA (40% of Basic)
- Special Allowance
- Employee PF (12% of Basic)
- Employer PF (12% of Basic)
- Professional Tax (State-wise)
- Income Tax with Section 87A rebate
- Health & Education Cess (4%)
- Gratuity (4.81% of Basic)

#### Tax Accuracy
- ✅ Official Income Tax Department slabs
- ✅ Standard Deduction: ₹50K (FY 2024-25), ₹75K (FY 2025-26+)
- ✅ Rebate under Section 87A: Up to ₹25K (FY 2024-25), ₹60K (FY 2025-26+)
- ✅ Rebate limit: ₹7L for both regimes
- ✅ New Regime FY 2025-26: 0-4L tax-free, new 25% bracket at 20-24L

### 🎨 Design & UX
- Modern gradient backgrounds
- Inter font family
- Touch-friendly inputs (py-3 spacing)
- Accessible ARIA labels and keyboard navigation
- Color-coded components (green for income, red for deductions)

### 🛠️ Technical Stack
- **React 19.2** - Latest React with modern hooks
- **Vite 7.3** - Lightning-fast build tool
- **TailwindCSS 4.1** - Modern utility-first CSS with v4 syntax
- **React Hook Form 7.69** - Performant form management
- **Recharts 3.6** - Interactive chart library
- **Numeral.js 2.0** - Number formatting
- **Date-fns 4.1** - Date utilities

### 🚀 Performance
- Bundle size: 179 KB (gzipped)
- CSS size: 5.34 KB (gzipped)
- Fast build time: ~5.5 seconds
- Optimized with Vite production build

### 📱 Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

### 🔒 Validation & Error Handling
- Minimum CTC: ₹1,00,000
- Maximum CTC: ₹10,00,00,000
- Required field validation
- Try-catch error boundaries
- User-friendly error messages

### 🎯 Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- Focus management in modals
- Semantic HTML structure

### 📦 Deployment
- Live at: https://ctc-tracker.vercel.app
- Auto-deployment via Vercel
- Custom favicon with ₹ symbol
- SEO optimized with meta tags

### 👨‍💻 Author
- **Aniket** - [@ananikets18](https://github.com/ananikets18)

---

## Future Roadmap

### Planned Features
- [ ] 80C deductions input (PPF, ELSS, etc.)
- [ ] Section 24 (home loan interest) deduction
- [ ] PDF export of salary breakdown
- [ ] Comparison with multiple CTCs
- [ ] Salary negotiation calculator
- [ ] Investment suggestions based on tax savings
- [ ] Dark mode support
- [ ] PWA (Progressive Web App) support
- [ ] Multi-language support (Hindi, Tamil, Telugu)

---

[1.0.0]: https://github.com/ananikets18/ctc-tracker/releases/tag/v1.0.0
