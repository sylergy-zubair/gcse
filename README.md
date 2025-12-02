# GCSE Frontend - Next.js Application

A modern, responsive frontend application for the GCSE learning platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Beautiful UI** - Designed to match the Figma design specifications
- 🔐 **Authentication** - JWT-based authentication with login/signup
- 📱 **Responsive Design** - Mobile-friendly layout
- 🎯 **Type-Safe** - Full TypeScript support
- ⚡ **Fast & Modern** - Built with Next.js 14 App Router

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. Add your backend API URLs to `.env.local`:
```env
NEXT_PUBLIC_AUTH_BASE_URL=https://your-auth-api.com
NEXT_PUBLIC_SUBJECTS=https://your-subjects-api.com
# ... add other API URLs
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── dashboard/         # Dashboard page
├── components/
│   ├── layout/            # Layout components (Header, Footer)
│   ├── home/              # Home page sections
│   └── ui/                # Reusable UI components
├── lib/
│   ├── api/               # API client utilities
│   └── constants.ts       # Constants and configuration
└── public/                # Static assets
```

## API Integration

The application is designed to consume the GCSE Backend APIs. Configure the following environment variables:

- `NEXT_PUBLIC_AUTH_BASE_URL` - Authentication service
- `NEXT_PUBLIC_SUBJECTS` - Subjects API
- `NEXT_PUBLIC_EXAM_PAPER` - Exam papers API
- `NEXT_PUBLIC_SUBS_PLAN` - Subscription plans API
- And more... (see `.env.local.example`)

## Design System

The design system matches the Figma specifications:

- **Primary Colors**: Blue (#0B5FD7, #05369A, #428DE7, #DCF0FF)
- **Accent Color**: Orange (#CD8400)
- **Typography**: Source Serif Pro (headings), Lato (body)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps

1. Configure your backend API URLs in `.env.local`
2. Customize the components to match your exact Figma design
3. Add actual images from Figma (replace placeholders)
4. Implement additional pages (exam taking, results, etc.)
5. Add error handling and loading states
6. Set up authentication state management

## License

Private project

