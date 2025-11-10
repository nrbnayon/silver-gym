# Silver GYM 🏋️‍♂️

A modern, full-featured gym management platform built with Next.js 16, TypeScript, and Tailwind CSS. Silver GYM provides a comprehensive solution for managing gym operations, client memberships, trainer schedules, and business workflows.

## 🌟 Features

### Authentication & User Management
- **Multi-step Registration**: Complete business and contact information collection
- **Secure Authentication**: Sign in/up with email verification and OTP
- **Password Management**: Forgot password and reset functionality
- **Role-based Access**: Different user roles and permissions

### Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Dark/Light Theme**: Automatic theme switching with next-themes
- **Accessibility**: Built with accessibility best practices
- **Modern Components**: Radix UI components with custom styling

### Performance & SEO
- **Next.js 16**: Latest version with App Router and Turbopack
- **TypeScript**: Full type safety throughout the application
- **SEO Optimized**: Structured data, meta tags, and sitemap generation
- **Analytics**: Vercel Analytics and Speed Insights integration

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 16.0.1 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom animations
- **Fonts**: Geist and Inter font families

### UI Components
- **Component Library**: Radix UI primitives
- **Icons**: Lucide React & Huge Icons
- **Animations**: Motion (Framer Motion)
- **Forms**: React Hook Form with Zod validation

### Development Tools
- **Linting**: ESLint 9 with Next.js config
- **Build**: Next.js Turbopack for fast development
- **Package Manager**: npm with lock file

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd silver-gym
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   # Add your API endpoints and other environment variables
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
silver-gym/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages group
│   │   ├── sign-in/       # Sign in page
│   │   ├── sign-up/       # Sign up page
│   │   ├── business-info/ # Business information collection
│   │   ├── contact-info/  # Contact information collection
│   │   ├── verification-method/ # Verification method selection
│   │   ├── verify-otp/    # OTP verification
│   │   ├── forgot-password/ # Password recovery
│   │   └── reset-password/ # Password reset
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage with examples
├── components/              # React components
│   ├── auth/               # Authentication-specific components
│   │   ├── SigninForm.tsx  # Sign in form
│   │   ├── SignUpForm.tsx  # Sign up form
│   │   ├── BusinessInfoForm.tsx # Business info collection
│   │   ├── ContactInfoForm.tsx  # Contact info collection
│   │   ├── VerificationMethodForm.tsx # Verification method
│   │   ├── VerifyOTPForm.tsx # OTP verification
│   │   ├── ForgotPasswordForm.tsx # Forgot password
│   │   ├── ResetPasswordForm.tsx # Reset password
│   │   ├── StepIndicator.tsx # Multi-step form indicator
│   │   └── SuccessPage.tsx # Success confirmation
│   ├── ui/                 # Reusable UI components (Radix UI)
│   ├── common/             # Common/shared components
│   └── modals/             # Modal components
├── hooks/                  # Custom React hooks
│   ├── useAuthFlow.ts     # Authentication flow management
│   └── useCountdown.ts    # Countdown timer hook
├── lib/                    # Utility functions
│   ├── utils.ts           # General utilities
│   └── seo.ts             # SEO configuration
├── types/                  # TypeScript type definitions
│   └── auth.ts            # Authentication types
├── public/                 # Static assets
│   ├── images/            # Image assets
│   ├── icons/             # Icon assets
│   └── fonts/             # Font files
└── data/                   # Static data and configurations
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Custom CSS Classes
- **Cards**: `card-center`, `card-gradient`, `card-glow`
- **Buttons**: `btn-primary`, `btn-secondary`
- **Inputs**: `input-primary`
- **Layout**: `container-custom`, `section-padding`

### Color Scheme
- **Primary**: Custom gradient backgrounds
- **Dark Mode**: Automatic theme switching
- **Accessibility**: WCAG compliant color contrasts

## 🔐 Authentication Flow

1. **Registration Process**:
   - Business Information Collection
   - Contact Information Collection
   - Verification Method Selection (Email/Phone)
   - OTP Verification
   - Success Confirmation

2. **Login Process**:
   - Email/Password Authentication
   - Forgot Password Option
   - Secure Password Reset

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: Optimized for touch interfaces
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full-featured experience

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@silvergym.com or join our Slack channel.

---

**Built with ❤️ by the Silver GYM Team**
