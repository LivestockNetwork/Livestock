# Rural Community Hub Australia

A comprehensive emergency planning and community networking platform for rural Australian families.

## Features

- **Emergency Planning**: Create personalized emergency plans for bushfires, floods, and severe weather
- **Community Network**: Connect with local rural families and share resources
- **Real-time Alerts**: Emergency notifications for your area
- **Resource Sharing**: Equipment and livestock marketplace
- **State-specific Content**: Tailored for all Australian states and territories
- **Location Services**: Get location-specific information and alerts
- **Weather Integration**: Real-time weather alerts and forecasts
- **Mobile Responsive**: Works on all devices

## Getting Started

### Development

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

\`\`\`bash
npm run build
npm run export
\`\`\`

### Deployment to DreamHost

1. Run `npm run export` to create a static build
2. Upload the `out` folder contents to your DreamHost public_html directory
3. Configure your domain to point to the uploaded files

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Static export for traditional hosting

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── register/          # User registration
│   ├── login/             # User authentication
│   ├── dashboard/         # User dashboard
│   └── actions/           # Server actions
├── components/            # Reusable components
│   └── ui/               # UI component library
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions
\`\`\`

## Key Pages

- `/` - Homepage with features overview
- `/register` - User registration form
- `/login` - User authentication
- `/dashboard` - Personalized user dashboard
- `/community` - Community feed and networking
- `/preparedness/bushfire` - Bushfire emergency planning
- `/preparedness/flood` - Flood emergency planning

## Australian Coverage

The platform supports all Australian states and territories:
- New South Wales (NSW)
- Victoria (VIC)
- Queensland (QLD)
- Western Australia (WA)
- South Australia (SA)
- Tasmania (TAS)
- Australian Capital Territory (ACT)
- Northern Territory (NT)

## Demo Accounts

- Email: `demo@rural.com` / Password: `demo123`
- Email: `farmer@example.com` / Password: `farm123`

## Deployment

This app is configured for static export and can be deployed to any static hosting provider including:

- DreamHost
- Netlify
- Vercel
- GitHub Pages
- Any traditional web hosting

The app uses browser localStorage for demo data storage, making it perfect for static hosting without requiring a backend database.

## License

Built for rural Australian communities with ❤️
