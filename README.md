# AK Enchanted Events - Visual Quote Builder

A stunning visual quote builder web application for **AK Enchanted Events**, a wedding/event decor rental company specializing in South Asian and Islamic weddings (Nikkah, Mehndi, Walima, Reception).

![Visual Quote Builder](https://via.placeholder.com/800x400?text=AK+Enchanted+Events+Quote+Builder)

## ✨ Features

### Core Functionality
- **Category-Based Item Browser** - Browse decor items organized by category:
  - Backdrops (draping, fairy lights, sequin panels)
  - Arches & Frames (circular, hexagon, rectangle)
  - Seating (sofas, loveseats, accent chairs)
  - Florals (arch arrangements, sofa wraps, centerpieces)
  - Lighting (candles, uplighting, string lights)
  - Accents (gold panels, mirrors, lanterns)
  - Stage & Base (platforms, rugs, steps)

- **Interactive Stage Preview** - Watch your setup build in real-time with layered SVG visualizations
- **Real-Time Quote Calculator** - Running total with tax and delivery estimates
- **Quote Request Form** - Capture customer details and event information

### Technical Features
- Responsive 3-panel desktop layout
- Mobile-optimized with bottom drawer navigation
- Smooth Framer Motion animations
- Persistent cart (localStorage via Zustand)
- Elegant serif/sans-serif typography pairing

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mjkhan9/personalproject.git
cd personalproject

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/          # Header, Footer, MainLayout
│   ├── Categories/      # CategorySidebar, ItemCard, MobileCategories
│   ├── Stage/          # StagePreview, StageItem, EmptyStage
│   ├── Quote/          # QuoteSummary, QuoteItem, QuoteForm
│   └── UI/             # Button, Modal, Badge
├── store/
│   └── quoteStore.js   # Zustand state management
├── data/
│   └── inventory.js    # Decor items data
├── App.jsx
├── main.jsx
└── index.css           # Tailwind + custom styles
```

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Gold) | `#D4AF37` | Buttons, accents, highlights |
| Primary Light | `#F4E4BA` | Hover states, backgrounds |
| Neutral Dark | `#1a1a1a` | Headers, text |
| Neutral Light | `#F8F8F8` | Backgrounds |
| Accent (Blush) | `#E8D5D5` | Soft accents |

### Typography
- **Headings**: Cormorant Garamond (elegant serif)
- **Body**: Work Sans (clean sans-serif)

## 📱 Responsive Behavior

- **Desktop (1024px+)**: 3-column layout with sidebar, stage preview, and quote summary
- **Tablet/Mobile**: Full-screen stage with floating bottom bar for navigation

## 🎯 Business Context

This application replaces a phone-based quoting process, allowing customers to:
1. Visualize their event setup before booking
2. Get instant price estimates
3. Submit quote requests with event details

It serves as both a lead generation tool and a self-service quoting platform.

## 🔮 Future Enhancements

- [ ] Color customization for florals/backdrops
- [ ] Package deals and bundles
- [ ] Date-based availability checking
- [ ] Admin panel for inventory management
- [ ] PDF quote export
- [ ] Gallery integration (Instagram API)
- [ ] Multi-language support (English/Urdu)

## 📄 License

This project is proprietary software for AK Enchanted Events.

## 👤 Author

Built with ❤️ for beautiful celebrations.

---

*AK Enchanted Events - Serving NJ/NY Metro Area*
