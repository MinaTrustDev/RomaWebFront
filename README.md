# Roma Pizza - Online Ordering Platform

A modern, scalable pizza ordering platform built with Next.js 16 and Clean Architecture principles.

## 🏗️ Architecture

This project follows **Clean Architecture** with clear separation of concerns:

- **Domain Layer**: Business entities, DTOs, and constants
- **Application Layer**: Use cases and business logic
- **Infrastructure Layer**: External services and data access
- **Presentation Layer**: UI components and pages

📖 **For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md)**

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Create `.env.local` file (see `.env.example`):

```env
NEXT_PUBLIC_API_BASE_URL=https://roma2go.com/wp-json
API_BASE_URL=https://roma2go.com/wp-json
API_AUTH_USERNAME=AppRoma
API_AUTH_PASSWORD=your-password
NEXT_PUBLIC_IMAGE_DOMAIN=roma2go.com
NEXT_PUBLIC_SITE_URL=https://roma2go.com
```

4. Run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
RomaPizza/
├── app/                    # Next.js app router pages
├── domain/                 # Business logic & entities
│   ├── entities/          # Domain entities
│   ├── dtos/             # Data Transfer Objects
│   └── constants/        # Business constants
├── application/          # Use cases & business rules
│   ├── interfaces/       # Repository contracts
│   └── use-cases/       # Business use cases
├── infrastructure/       # External services
│   ├── repositories/    # Data access implementations
│   └── factories/      # Dependency injection
├── presentation/        # UI layer
│   ├── actions/        # Server actions
│   ├── home/          # Home page components
│   ├── product/       # Product page components
│   └── store/        # State management
└── components/        # Reusable UI components
```

## 🎯 Features

- ✅ Clean Architecture implementation
- ✅ Server-side rendering with Next.js
- ✅ Optimized caching strategies
- ✅ SEO optimized (metadata, structured data, sitemap)
- ✅ RTL support (Arabic)
- ✅ Responsive design
- ✅ Type-safe with TypeScript
- ✅ Image optimization
- ✅ Performance optimized

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI, Shadcn UI
- **HTTP Client**: Axios
- **Maps**: Google Maps API
- **Carousel**: Embla Carousel

## 📚 Documentation

- [Architecture Documentation](./ARCHITECTURE.md) - Complete architecture guide
- [Architecture Graphs](./docs/ARCHITECTURE_GRAPH.md) - Visual flow diagrams

## 🏃 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Environment Variables

See `.env.example` for required environment variables.

## 📝 License

Private project - All rights reserved
