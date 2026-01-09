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

See [ENV_VARIABLES.md](./ENV_VARIABLES.md) for detailed information about all required environment variables.

## 🚀 Deployment to Vercel

### Prerequisites

- A Vercel account ([sign up here](https://vercel.com))
- Your project pushed to GitHub, GitLab, or Bitbucket

### Deployment Steps

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project to Vercel**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js framework

3. **Configure Environment Variables**:

   - In your Vercel project settings, go to **Settings** → **Environment Variables**
   - Add the following variables (see [ENV_VARIABLES.md](./ENV_VARIABLES.md) for details):
     - `API_AUTH_USERNAME` - Your API username
     - `API_AUTH_PASSWORD` - Your API password
     - `NEXT_PUBLIC_IMAGE_DOMAIN` - Your image domain (optional, defaults to roma2go.com)
     - `NEXT_PUBLIC_SITE_URL` - Your site URL (optional, defaults to https://roma2go.com)
     - `API_BASE_URL` - API base URL (optional)
     - `NEXT_PUBLIC_API_BASE_URL` - Public API base URL (optional)

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application
   - Your site will be live at `https://your-project.vercel.app`

### Build Configuration

The project includes `vercel.json` with optimal settings:

- Build command: `npm run build`
- Framework: Next.js
- Node.js version: Auto-detected

### Post-Deployment

- Verify your environment variables are set correctly
- Check the build logs for any errors
- Test the deployment URL
- Configure custom domain (optional) in Vercel project settings

## 📝 License

Private project - All rights reserved
