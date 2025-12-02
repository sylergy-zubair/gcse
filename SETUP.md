# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Copy from .env.local.example and fill in your API URLs
NEXT_PUBLIC_AUTH_BASE_URL=http://your-auth-api.com
NEXT_PUBLIC_SUBJECTS=http://your-subjects-api.com
NEXT_PUBLIC_EXAM_PAPER=http://your-exam-paper-api.com
NEXT_PUBLIC_SUBS_PLAN=http://your-subscription-api.com
# ... add all other API URLs
```

## Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## What's Included

✅ Complete Next.js 14 setup with TypeScript
✅ Tailwind CSS configured with Figma design tokens
✅ Home page with all sections from Figma design:
   - Hero Section with navigation
   - Subjects Section
   - How It Works
   - Why Choose Us
   - Demo Video & Report sections
   - Pricing Plans
   - FAQ Section
   - Final CTA
   - Footer

✅ Authentication pages (Login/Signup)
✅ Dashboard page
✅ API integration utilities ready for backend
✅ Responsive design

## Next Steps

1. **Add Images**: Replace placeholder divs with actual images from Figma
2. **Configure APIs**: Add your backend API URLs to `.env.local`
3. **Test Authentication**: Try logging in/signing up once APIs are connected
4. **Customize**: Adjust colors, fonts, spacing to match Figma exactly
5. **Add Features**: Build out exam-taking, results, and other pages

## Project Structure

- `src/app/` - Next.js pages (App Router)
- `src/components/` - Reusable React components
- `src/lib/api/` - API client functions for backend integration
- `src/lib/constants.ts` - Constants and configuration
- `src/types/` - TypeScript type definitions

## Design System

Colors, fonts, and spacing are configured in:
- `tailwind.config.ts` - Tailwind configuration
- `src/app/globals.css` - Global styles and fonts

