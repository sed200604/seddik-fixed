# Go LLC — Interactive Ebook

A cinematic, scroll-driven web experience tailored for Algerian entrepreneurs. This application educates users on the risks of cheap US LLC formation traps and converts them into customers of the Go LLC premium service.

## Project Architecture

This ebook operates as a dedicated route (`/ebook`) within a Next.js 14 (App Router) project.

### Core Features
- **Cinematic Scrolling**: Powered by Lenis for smooth scrolling, with robust scroll-tracking mechanisms.
- **RTL-First Typography**: Native support for Arabic formatting and right-to-left layout constraints using modern CSS logical properties (`inset-inline-start`, `padding-block`, etc.).
- **Interactive 3D Elements**: Uses `@react-three/fiber` and `@react-three/drei` for interactive 3D visualizations (e.g., the Algeria map).
- **Advanced Animations**: Powered by `motion/react` and `gsap` for staggered reveals, layout transitions, and complex interactive effects.
- **Performance Optimized**: Heavy components and 3D scenes are dynamically imported (`ssr: false`) to ensure a tiny initial JS bundle footprint.
- **Content Gating & Paywall**: Hybrid gating system that prevents content leakage to unauthenticated or unpaid users.

### Protection & Anti-Scraping
- **Client-Side Verification**: Prevents DOM-scraping by validating user states before rendering sensitive nodes.
- **Canvas Watermarking**: Injects unique, randomized, and visually subtle session watermarks onto the page to trace unauthorized screenshots.
- **Protection Layer**: Actively blocks common scraping shortcuts and developer tools, ensuring proprietary material is protected.
- **Legal Defense**: Contains an actionable DMCA Takedown Template (`legal/takedown_template.md`) to be used if the design or content is replicated.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Structure

- `/src/app/ebook` - The main ebook Next.js route and layout shell
- `/src/components/ebook/chapters` - The 14 individual chapter components
- `/src/components/ebook/ui` - Reusable interactive atoms (FlipCards, MagneticButtons, etc)
- `/src/components/ebook/providers` - Global state context and scroll management
- `/src/components/ebook/protection` - Anti-scraping and watermarking systems
- `/src/data/ebook` - Typed data stores for the ebook content
- `/src/lib/ebook` - PostHog analytics and Stripe utility wrappers

## License

All content, design systems, and specialized code within the `/ebook` namespace are proprietary to Go LLC. Unauthorized reproduction is prohibited.
