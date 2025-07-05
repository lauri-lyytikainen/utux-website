# UTUX Website

A modern, multilingual website built with Next.js 15, Payload CMS, and TypeScript. This project features a headless CMS architecture with PostgreSQL supabase database, S3 storage, and a comprehensive block-based content system.

## 🚀 Features

### Core Technologies

- **Next.js 15** - React framework with App Router
- **Payload CMS** - Headless content management system
- **TypeScript** - Type-safe development
- **PostgreSQL** - Primary database
- **S3 Storage** - File and media storage
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI (Shadcn)** - Accessible component primitives

### Content Management

- **Multilingual Support** - Finnish (fi) and English (en) localization
- **Block-Based Content** - Modular content blocks for flexible page building
- **SEO Optimization** - Built-in SEO plugin with meta management
- **Media Management** - Advanced image handling with Sharp optimization
- **Nested Pages** - Hierarchical page structure with breadcrumbs

### Content Blocks

- **Hero Sections** - Simple and Super hero layouts
- **Call to Action** - Promotional content blocks
- **Text Blocks** - Rich text content with Lexical editor
- **Media Blocks** - Image and video content
- **Contact Forms** - Interactive contact forms
- **Accordion** - Collapsible content sections
- **Profile Cards** - Team member profiles
- **Image Carousel** - Slideshow functionality
- **File Buttons** - Downloadable file links
- **Link Buttons** - Custom link components
- **Cookie Preferences** - GDPR compliance

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Public website routes
│   └── (payload)/         # Payload CMS admin routes
├── blocks/                # Content block components
│   ├── CallToAction/
│   ├── ContactForm/
│   ├── HeroSection/
│   ├── Media/
│   └── ...               # Other block types
├── collections/           # Payload CMS collections
│   ├── Pages.ts          # Page content management
│   ├── Media.ts          # Media file management
│   ├── Users.ts          # User management
│   ├── Files.ts          # File uploads
│   └── SiteLinks.ts      # Navigation links
├── components/            # Reusable UI components
│   ├── Header/
│   ├── Footer/
│   ├── Breadcrumbs/
│   └── ui/               # Base UI components
├── globals/              # Global content (Header, Footer, etc.)
├── utilities/            # Helper functions
├── access/               # Access control functions
├── migrations/           # Database migrations
└── payload.config.ts     # Payload CMS configuration
```

## 🛠️ Prerequisites

- **Node.js** 18.20.2 or >=20.9.0
- **pnpm** ^10 (recommended package manager)
- **PostgreSQL** database
- **S3-compatible storage** (AWS S3, MinIO, etc.)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd utux-website
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URI=

# Payload CMS
PAYLOAD_SECRET=
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# S3 Storage
S3_BUCKET=your-bucket-name
S3_ENDPOINT=your-endpoint-url
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=your-region

# Email
GMAIL_USERNAME= (gmail app access)
GMAIL_PASSWORD= (gmail app access)

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=your-gtm-id

# Cookie Kit
NEXT_PUBLIC_COOKIE_KIT_ID=your-cookie-kit-id
```

### 4. Database Setup

Ensure your PostgreSQL database is running and accessible with the credentials specified in your `DATABASE_URI`.

### 5. Development Server

```bash
# Start development server
pnpm dev

# Or start with clean cache
pnpm devsafe
```

The application will be available at:

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## 📦 Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm devsafe          # Clean cache and start development server

# Building
pnpm build            # Build for production
pnpm build:no-migrations  # Build without running migrations

# Payload CMS
pnpm payload          # Run Payload CLI commands
pnpm generate:types   # Generate TypeScript types
pnpm generate:importmap  # Generate import map
pnpm payload:migrate create  # Create a new migration
pnpm payload:migrate run     # Run migrations

# Utilities
pnpm lint             # Run ESLint
pnpm start            # Start production server
```

## 🏗️ Architecture

### Frontend Architecture

- **App Router**: Next.js 15 App Router for file-based routing
- **Server Components**: React Server Components for improved performance
- **Static Generation**: Pre-rendered pages with ISR (Incremental Static Regeneration)
- **Internationalization**: Built-in i18n support with locale routing

### CMS Architecture

- **Headless CMS**: Payload CMS for content management
- **Block System**: Modular content blocks for flexible page building
- **Media Management**: S3 storage with image optimization
- **User Management**: Role-based access control
- **API**: REST and GraphQL APIs for content delivery

### Database Schema

- **Pages**: Hierarchical page structure with nested routing
- **Media**: File uploads with metadata and image processing
- **Users**: Admin user management
- **SiteLinks**: Navigation and link management
- **Globals**: Site-wide content (header, footer, etc.)

## 🎨 Content Blocks

### Hero Sections

- **Simple Hero**: Basic hero with title and optional content
- **Super Hero**: Advanced hero with image, description, and CTA

### Interactive Blocks

- **Contact Form**: Email contact forms with validation
- **Accordion**: Collapsible content sections
- **Image Carousel**: Slideshow with navigation
- **Cookie Preferences**: GDPR-compliant cookie management

### Content Blocks

- **Text Block**: Rich text content with Lexical editor
- **Media Block**: Image and video content
- **Call to Action**: Promotional content with buttons
- **Profile Card**: Team member or person profiles
- **File Button**: Downloadable file links
- **Link Button**: Custom styled link components

## 🌐 Internationalization

The website supports multiple languages with the following features:

- **Locale Routing**: `/fi/` and `/en/` URL prefixes
- **Content Localization**: All content can be translated
- **SEO Localization**: Language-specific meta tags and URLs
- **Default Language**: Finnish (fi) is the default locale

## 🔧 Configuration

### Payload CMS Configuration

The main configuration is in `src/payload.config.ts`:

- Database adapter (PostgreSQL)
- Collections and globals
- Content blocks
- Plugins (SEO, nested docs, S3 storage)
- Localization settings

### Next.js Configuration

- Custom configuration in `next.config.mjs`
- Payload integration with `@payloadcms/next`
- Image optimization settings
- Environment-specific configurations

## 🐳 Docker Deployment

### Development with Docker Compose

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d
```

### Production Docker Build

```bash
# Build production image
docker build -t utux-website .

# Run production container
docker run -p 3000:3000 utux-website
```

## 🔒 Security

- **CSRF Protection**: Built-in CSRF protection
- **CORS Configuration**: Configurable CORS settings
- **Access Control**: Role-based permissions
- **Environment Variables**: Secure configuration management
- **Input Validation**: Zod schema validation

## 📊 Performance

- **Static Generation**: Pre-rendered pages for fast loading
- **Image Optimization**: Sharp-based image processing
- **Code Splitting**: Automatic code splitting by Next.js
- **Caching**: Built-in caching strategies
- **CDN Ready**: S3 storage with CDN support

## 🧪 Testing

```bash
# Run linting
pnpm lint

# Type checking
pnpm generate:types
```

## 📝 Environment Variables

| Variable                 | Description                  | Required |
| ------------------------ | ---------------------------- | -------- |
| `DATABASE_URI`           | PostgreSQL connection string | Yes      |
| `PAYLOAD_SECRET`         | Payload CMS secret key       | Yes      |
| `NEXT_PUBLIC_SERVER_URL` | Public server URL            | Yes      |
| `S3_BUCKET`              | S3 bucket name               | Yes      |
| `S3_ACCESS_KEY_ID`       | S3 access key                | Yes      |
| `S3_SECRET_ACCESS_KEY`   | S3 secret key                | Yes      |
| `S3_REGION`              | S3 region                    | Yes      |
| `S3_ENDPOINT`            | S3 endpoint URL              | Yes      |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Build stuck on "Collecting page data"**

```bash
# Build without migrations
pnpm build:no-migrations
```

**Database connection issues**

- Verify `DATABASE_URI` is correct
- Ensure PostgreSQL is running
- Check network connectivity

**S3 upload issues**

- Verify S3 credentials
- Check bucket permissions
- Ensure endpoint URL is correct

**Development server issues**

```bash
# Clear cache and restart
pnpm devsafe
```

## 📞 Support

For support and questions:

- Check the [Payload CMS documentation](https://payloadcms.com/docs)
- Review the [Next.js documentation](https://nextjs.org/docs)
- Open an issue in this repository

---

Built with ❤️ using Next.js, Payload CMS, and TypeScript
