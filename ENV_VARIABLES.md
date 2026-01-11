# Environment Variables

This document lists all the environment variables required for this project.

## Required Environment Variables

### API Configuration

- **`API_BASE_URL`** (optional, server-side only)
  - Base URL for the WordPress REST API
  - Default: `https://roma2go.com/wp-json`
  - Used in server-side API calls

- **`NEXT_PUBLIC_API_BASE_URL`** (optional, public)
  - Base URL for the WordPress REST API (public)
  - Default: `https://roma2go.com/wp-json`
  - Exposed to the browser

### API Authentication

- **`API_AUTH_USERNAME`** (required, server-side only)
  - Username for Basic Authentication
  - Used for API authentication

- **`API_AUTH_PASSWORD`** (required, server-side only)
  - Password for Basic Authentication
  - Used for API authentication

### Image Domain

- **`NEXT_PUBLIC_IMAGE_DOMAIN`** (optional, public)
  - Domain for serving images (used in Next.js Image component)
  - Default: `roma2go.com`
  - Exposed to the browser

### Site URL

- **`NEXT_PUBLIC_SITE_URL`** (optional, public)
  - Your site's public URL (used for SEO, sitemaps, etc.)
  - Default: `https://roma2go.com`
  - Exposed to the browser

## Setting Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each environment variable:
   - `API_AUTH_USERNAME` - Your API username
   - `API_AUTH_PASSWORD` - Your API password
   - `NEXT_PUBLIC_IMAGE_DOMAIN` - Your image domain (optional)
   - `NEXT_PUBLIC_SITE_URL` - Your site URL (optional)
   - `API_BASE_URL` - API base URL (optional)
   - `NEXT_PUBLIC_API_BASE_URL` - Public API base URL (optional)

## Local Development

Create a `.env.local` file in the root directory with your environment variables:

```env
# API Configuration
API_BASE_URL=https://roma2go.com/wp-json
NEXT_PUBLIC_API_BASE_URL=https://roma2go.com/wp-json

# API Authentication
API_AUTH_USERNAME=your_username_here
API_AUTH_PASSWORD=your_password_here

# Image Domain
NEXT_PUBLIC_IMAGE_DOMAIN=roma2go.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://roma2go.com
```

**Note:** Never commit `.env.local` to version control. It's already in `.gitignore`.





