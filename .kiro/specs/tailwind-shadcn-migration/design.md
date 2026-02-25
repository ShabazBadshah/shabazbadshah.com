# Design Document: Tailwind CSS and shadcn/ui Migration

## Overview

This design document outlines the technical approach for migrating a Next.js 12 personal blog/portfolio website from Material UI v5 to Tailwind CSS v3 and shadcn/ui. The migration will be executed in phases to minimize risk and ensure all functionality is preserved.

The migration strategy follows a bottom-up approach: first establishing the infrastructure (Tailwind and shadcn/ui configuration), then migrating atomic components (buttons, typography), followed by composite components (header, footer), and finally page-level components.

## Architecture

### Current Architecture

```
Next.js 12 Application
├── Styling: Material UI v5 + Emotion (CSS-in-JS)
├── Components: @mui/material components
├── Icons: @mui/icons-material
├── Theming: Material UI theme provider
└── Responsive: Material UI breakpoints + sx prop
```

### Target Architecture

```
Next.js 12 Application
├── Styling: Tailwind CSS v3 (utility-first)
├── Components: shadcn/ui (Radix UI primitives)
├── Icons: lucide-react
├── Theming: Tailwind config + CSS variables
└── Responsive: Tailwind responsive prefixes
```

### Migration Phases

**Phase 1: Infrastructure Setup**

- Install Tailwind CSS and configure for Next.js 12
- Install shadcn/ui and configure component system
- Create utility functions (cn helper)
- Configure PostCSS and build pipeline

**Phase 2: Theme Configuration**

- Map Material UI theme to Tailwind config
- Define color palette in Tailwind
- Configure typography scale
- Set up spacing and breakpoints

**Phase 3: Component Migration**

- Migrate utility components (Link, SEO)
- Migrate atomic components (About, Socials)
- Migrate composite components (Header, Footer)
- Migrate layout components (MainLayout)
- Migrate page components (index, blog pages)

**Phase 4: Cleanup and Validation**

- Remove Material UI dependencies
- Verify all pages render correctly
- Test responsive behavior
- Validate accessibility

## Components and Interfaces

### Configuration Files

#### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
```

#### postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

#### components.json (shadcn/ui config)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components/ui",
    "utils": "@/lib/utils"
  }
}
```

### Utility Functions

#### lib/utils.ts

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This utility function combines `clsx` for conditional className logic with `tailwind-merge` to intelligently merge Tailwind classes and resolve conflicts.

### Component Migration Mappings

#### Material UI to Tailwind/shadcn Mapping

| Material UI Component | Replacement Strategy                                                     |
| --------------------- | ------------------------------------------------------------------------ |
| `Box`                 | `<div>` with Tailwind classes                                            |
| `Container`           | `<div>` with `container` class or custom max-width                       |
| `Typography`          | Semantic HTML (`<h1>`, `<p>`, `<span>`) with Tailwind typography classes |
| `Button`              | shadcn `Button` component                                                |
| `IconButton`          | shadcn `Button` with `variant="ghost"` and `size="icon"`                 |
| `SwipeableDrawer`     | shadcn `Sheet` component                                                 |
| `Divider`             | shadcn `Separator` or `<hr>` with Tailwind classes                       |
| `Avatar`              | shadcn `Avatar` component                                                |
| `Grid`                | `<div>` with Tailwind grid classes (`grid`, `grid-cols-*`)               |

#### sx Prop to Tailwind Class Mapping

| sx Property                 | Tailwind Equivalent |
| --------------------------- | ------------------- |
| `display: 'flex'`           | `flex`              |
| `flexDirection: 'column'`   | `flex-col`          |
| `justifyContent: 'center'`  | `justify-center`    |
| `alignItems: 'center'`      | `items-center`      |
| `gap: 2`                    | `gap-2` (8px)       |
| `padding: { xs: 3, md: 4 }` | `p-3 md:p-4`        |
| `marginTop: 0`              | `mt-0`              |
| `position: 'sticky'`        | `sticky`            |
| `top: 0`                    | `top-0`             |
| `backgroundColor: 'black'`  | `bg-black`          |
| `color: 'text.primary'`     | `text-foreground`   |
| `fontSize: '1.1rem'`        | `text-lg`           |
| `fontWeight: 600`           | `font-semibold`     |
| `borderRadius: '100px'`     | `rounded-full`      |
| `width: '100%'`             | `w-full`            |
| `minHeight: '100vh'`        | `min-h-screen`      |

#### Responsive Breakpoint Mapping

| Material UI | Tailwind  | Pixel Value    |
| ----------- | --------- | -------------- |
| `xs`        | (default) | 0px            |
| `sm`        | `sm:`     | 640px          |
| `md`        | `md:`     | 900px (custom) |
| `lg`        | `lg:`     | 1024px         |
| `xl`        | `xl:`     | 1280px         |

Note: Material UI's `md` breakpoint is 900px, while Tailwind's default is 768px. We'll customize Tailwind's `md` breakpoint to 900px for consistency.

### Component Designs

#### Header Component (Migrated)

```typescript
import { MoreHorizontal, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import About from '@/components/shared/About';
import Link from '@/components/shared/Link';
import Socials from '@/components/shared/Socials';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type Props = {
  extraDrawerContent: React.ReactNode;
};

const HeaderContents = ({
  extraDrawerContent
}: {
  extraDrawerContent: React.ReactNode;
}): JSX.Element => (
  <div className="sticky top-0 mt-0 p-3 md:p-4 pb-5 md:pb-0 flex flex-col justify-start gap-4">
    {extraDrawerContent ? null : (
      <div className="flex flex-col items-start gap-2">
        <Link href="/" className="mb-2 flex justify-center">
          <Image
            layout="responsive"
            src={'/images/logo.png'}
            height={'12px'}
            width={'12px'}
            objectFit="cover"
            loading="eager"
            style={{
              width: '100%',
              height: '100%'
            }}
            blurDataURL={'/images/logo.png'}
          />
          <span className="text-lg font-semibold text-foreground">Badshah Consulting</span>
        </Link>
        <About />
      </div>
    )}
    {extraDrawerContent}
    <Socials />
  </div>
);

export default function Header({ extraDrawerContent }: Props): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    if (media.matches !== isMobile) {
      setIsMobile(media.matches);
    }
    const listener = () => setIsMobile(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [isMobile]);

  return (
    <>
      {isMobile && (
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent side="bottom" className="rounded-t-[14px] block md:hidden">
            <div className="w-full flex justify-center">
              <ChevronDown
                className="text-2xl mb-1 cursor-pointer"
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>
            <HeaderContents
              extraDrawerContent={
                <>
                  <div>
                    <About />
                  </div>
                  {extraDrawerContent}
                </>
              }
            />
          </SheetContent>
        </Sheet>
      )}

      <Button
        variant="default"
        size="icon"
        className="flex md:hidden fixed z-10 bottom-[30px] right-[30px] w-[50px] h-[50px] shadow-[0px_0px_25px_15px_rgba(0,0,0,0.05)] bg-black hover:bg-black"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MoreHorizontal className="text-white text-[40px]" />
      </Button>

      <div className="hidden md:block min-h-screen border-r border-border w-[340px]">
        <HeaderContents extraDrawerContent={extraDrawerContent} />
      </div>
    </>
  );
}
```

#### MainLayout Component (Migrated)

```typescript
import React from 'react';

import Header from '@/components/shared/Header';
import Footer from '../components/shared/Footer';

type Props = {
  pageHeader?: React.ReactNode;
  extraDrawerContent?: React.ReactNode;
  extraFooterContent?: React.ReactNode;
  children: React.ReactNode;
};

const MainLayout = ({
  pageHeader,
  extraDrawerContent,
  extraFooterContent,
  children
}: Props): JSX.Element => {
  return (
    <div className="flex">
      <Header extraDrawerContent={extraDrawerContent} />
      <div className="block min-w-0 flex-1 py-2 sm:py-5">
        {pageHeader && <div className="container">{pageHeader}</div>}
        <div className="container flex justify-center">
          <div className="max-w-7xl px-0 lg:px-2">{children}</div>
        </div>

        <div className="container">
          <Footer extraFooterContent={extraFooterContent} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
```

#### About Component (Migrated)

```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function About(): JSX.Element {
  return (
    <>
      <div className="flex gap-2 items-center mb-2">
        <Avatar className="w-16 h-16 border border-black">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/4944388?v=4"
            alt="Shabaz Badshah"
          />
          <AvatarFallback>SB</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-base font-medium leading-5 text-foreground">Shabaz Badshah</h3>
          <p className="text-sm text-foreground">Technical Product Consultant</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        I integrate product strategy with technical execution to solve impactful business problems.
        Today, I'm focused on advancing healthcare digitization efforts for independent healthcare
        services in Ontario.
      </p>
    </>
  );
}
```

#### Socials Component (Migrated)

```typescript
import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { trackConnectLinkClick } from '@/analytics/tracking';
import { Button } from '@/components/ui/button';

type SocialProfile = {
  name: string;
  provider: socialMediaProfileProviders;
  url: string;
  IconComponent: React.ReactNode;
  cta: string;
};

export type socialMediaProfileProviders = 'github' | 'linkedin' | 'email';

const profiles: SocialProfile[] = [
  {
    name: '@ShabazBadshah',
    provider: 'github',
    url: 'https://github.com/ShabazBadshah',
    IconComponent: <FaGithub className="w-5 h-5" />,
    cta: 'Follow'
  },
  {
    name: '/in/shabaz-badshah/',
    provider: 'linkedin',
    url: 'https://www.linkedin.com/in/shabaz-badshah/',
    IconComponent: <Linkedin className="w-[23px] h-[23px] text-[#0077B5]" />,
    cta: 'Connect'
  },
  {
    name: 'badshah.shabaz.dev@gmail.com',
    provider: 'email',
    url: 'mailto:badshah.shabaz.dev@gmail.comSubject=Hey%20Shabaz',
    IconComponent: <Mail className="w-5 h-5" />,
    cta: 'Email'
  }
];

const Socials = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base font-medium leading-5 text-foreground">Let's connect</h3>
      <div className="flex flex-col gap-2">
        {profiles.map((profile) => {
          return (
            <Button
              key={profile.name}
              variant="outline"
              size="sm"
              className="text-foreground py-0.5 border-[#cecece] font-normal w-full rounded-full text-center lowercase hover:text-primary hover:border-[#085CC5]"
              asChild
            >
              <a href={profile.url} onClick={() => trackConnectLinkClick(profile.provider)}>
                <div className="flex flex-row justify-center items-center gap-1">
                  {profile.IconComponent}
                  {profile.name}
                </div>
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Socials;
```

#### Footer Component (Migrated)

```typescript
import React from 'react';
import { Separator } from '@/components/ui/separator';

type Props = {
  extraFooterContent?: React.ReactNode;
};

const Footer = ({ extraFooterContent }: Props): JSX.Element => {
  return (
    <footer>
      <div className="bg-background pb-8">
        {extraFooterContent}
        <Separator className="my-4" />
        <p className="text-sm">©{new Date().getFullYear()} built by Shabaz Badshah</p>
      </div>
    </footer>
  );
};

export default Footer;
```

## Data Models

### Theme Configuration Model

The theme will be defined using CSS variables in the global stylesheet, allowing for easy theme switching and consistency across components.

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 210 100% 40%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 210 100% 40%;
    --radius: 0.5rem;
  }
}
```

### Responsive Breakpoint Model

Custom Tailwind configuration to match Material UI breakpoints:

```javascript
// In tailwind.config.js
screens: {
  'sm': '640px',
  'md': '900px',  // Custom to match Material UI
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Material UI Dependencies Removed

_For any_ Material UI package (@mui/material, @mui/icons-material, @emotion/react, @emotion/styled, @mui/styles, @mui/system), the package.json file should not contain that package in the dependencies or devDependencies sections.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**

### Property 2: Required Dependencies Installed

_For any_ required new dependency (tailwindcss, postcss, autoprefixer, lucide-react, class-variance-authority, clsx, tailwind-merge), the package.json file should contain that package in the dependencies or devDependencies sections.

**Validates: Requirements 1.7, 1.8, 1.9, 1.10, 1.11, 1.12**

### Property 3: Material UI Imports Eliminated

_For any_ TypeScript or JavaScript file in the src/ or pages/ directories, that file should not contain import statements from @mui/material, @mui/icons-material, @emotion/react, @emotion/styled, @mui/styles, or @mui/system.

**Validates: Requirements 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 7.10, 7.11, 7.12, 7.13, 8.1, 8.2, 8.3, 8.4, 8.5, 10.1, 10.2, 10.3, 10.4**

### Property 4: sx Prop Usage Eliminated

_For any_ TypeScript or JavaScript file in the src/ or pages/ directories, that file should not contain the sx prop being passed to any component.

**Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10**

### Property 5: Tailwind Classes Present

_For any_ component file that previously used Material UI styling, that file should now contain className attributes with Tailwind utility classes.

**Validates: Requirements 5.3, 6.4, 7.6, 8.2, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10**

## Error Handling

### Configuration Errors

**Missing Configuration Files**

- If tailwind.config.js is missing, the build will fail with a clear error message
- If postcss.config.js is missing, Tailwind directives won't be processed
- Solution: Ensure all configuration files are created in Phase 1

**Invalid Tailwind Configuration**

- If content paths are incorrect, Tailwind won't detect classes and will purge them
- Solution: Verify content paths include all component directories

**shadcn/ui Configuration Issues**

- If components.json is misconfigured, shadcn CLI commands will fail
- If utils path is incorrect, cn() function won't be found
- Solution: Follow shadcn/ui setup documentation exactly

### Component Migration Errors

**Missing shadcn Components**

- If a shadcn component is used but not installed, import will fail
- Solution: Install all required shadcn components: `npx shadcn-ui@latest add button sheet avatar separator`

**Icon Import Errors**

- If lucide-react icons are used but package not installed, imports will fail
- If icon names don't match (e.g., ExpandMoreIcon vs ChevronDown), imports will fail
- Solution: Create an icon mapping reference and verify all icon imports

**TypeScript Type Errors**

- If shadcn components are used without proper types, TypeScript will error
- If className prop types are incorrect, TypeScript will error
- Solution: Ensure @types packages are installed and tsconfig.json is correct

### Build Errors

**PostCSS Processing Errors**

- If PostCSS can't process Tailwind directives, build will fail
- Solution: Verify postcss.config.js is correct and plugins are installed

**CSS Import Errors**

- If global CSS file with Tailwind directives isn't imported in \_app.tsx, styles won't apply
- Solution: Ensure globals.css is imported at the top of \_app.tsx

**Purge Configuration Issues**

- If Tailwind purges classes that are actually used, styles will be missing in production
- Solution: Verify content paths in tailwind.config.js are comprehensive

### Runtime Errors

**Sheet Component Not Opening**

- If Sheet component doesn't open, check that state management is correct
- Solution: Verify open and onOpenChange props are properly connected to state

**Responsive Breakpoints Not Working**

- If responsive classes don't apply at correct breakpoints, check Tailwind config
- Solution: Verify custom md:900px breakpoint is configured in tailwind.config.js

**Missing Styles**

- If components render but have no styles, Tailwind classes may not be detected
- Solution: Check that component files are included in Tailwind content paths

## Testing Strategy

### Dual Testing Approach

This migration will use both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific configuration files exist, specific imports are removed, and build commands succeed
- **Property tests**: Verify universal properties like "no Material UI imports exist in any component file"

### Unit Testing

Unit tests will focus on:

1. **Configuration Validation**

   - Verify tailwind.config.js exists and contains correct content paths
   - Verify postcss.config.js exists and contains correct plugins
   - Verify components.json exists and contains correct shadcn configuration
   - Verify globals.css contains Tailwind directives

2. **Dependency Validation**

   - Verify package.json does not contain Material UI packages
   - Verify package.json contains all required new packages
   - Verify package versions are compatible with Next.js 12

3. **Build Process Validation**

   - Run `pnpm build` and verify it completes without errors
   - Verify TypeScript compilation succeeds with `tsc --noEmit`
   - Verify no console errors during build

4. **Component Spot Checks**
   - Verify Header component renders without errors
   - Verify MainLayout component renders without errors
   - Verify About component renders without errors

### Property-Based Testing

Property tests will verify universal correctness properties across the entire codebase. Each property test will run a minimum of 100 iterations to ensure comprehensive coverage.

**Property Test 1: Material UI Dependencies Removed**

- Generate: List of all Material UI package names
- Test: For each package, verify it does not appear in package.json
- Tag: **Feature: tailwind-shadcn-migration, Property 1: Material UI Dependencies Removed**

**Property Test 2: Required Dependencies Installed**

- Generate: List of all required new package names
- Test: For each package, verify it appears in package.json
- Tag: **Feature: tailwind-shadcn-migration, Property 2: Required Dependencies Installed**

**Property Test 3: Material UI Imports Eliminated**

- Generate: List of all TypeScript/JavaScript files in src/ and pages/
- Test: For each file, verify it contains no imports from Material UI packages
- Tag: **Feature: tailwind-shadcn-migration, Property 3: Material UI Imports Eliminated**

**Property Test 4: sx Prop Usage Eliminated**

- Generate: List of all TypeScript/JavaScript files in src/ and pages/
- Test: For each file, verify it contains no sx prop usage
- Tag: **Feature: tailwind-shadcn-migration, Property 4: sx Prop Usage Eliminated**

**Property Test 5: Tailwind Classes Present**

- Generate: List of all component files that previously used Material UI
- Test: For each file, verify it contains className attributes with Tailwind classes
- Tag: **Feature: tailwind-shadcn-migration, Property 5: Tailwind Classes Present**

### Testing Tools

- **Property-Based Testing Library**: fast-check (JavaScript/TypeScript property testing)
- **Unit Testing Framework**: Jest or Vitest (already in Next.js ecosystem)
- **File System Testing**: Node.js fs module for reading files and checking content
- **Build Testing**: Child process execution to run build commands

### Test Configuration

```javascript
// Example property test configuration
import fc from 'fast-check';

describe('Material UI Migration Properties', () => {
  it('Property 3: Material UI Imports Eliminated', () => {
    fc.assert(
      fc.property(fc.constantFrom(...getAllComponentFiles()), (filePath) => {
        const content = fs.readFileSync(filePath, 'utf-8');
        const muiImportPattern =
          /@mui\/(material|icons-material|styles|system)|@emotion\/(react|styled)/;
        return !muiImportPattern.test(content);
      }),
      { numRuns: 100 }
    );
  });
});
```

### Manual Testing Checklist

While automated tests cover correctness properties, manual testing is required for:

1. **Visual Regression Testing**

   - Compare screenshots of pages before and after migration
   - Verify colors, spacing, and typography match

2. **Responsive Behavior Testing**

   - Test on mobile viewport (< 640px)
   - Test on tablet viewport (640px - 900px)
   - Test on desktop viewport (> 900px)
   - Verify drawer opens on mobile
   - Verify sidebar shows on desktop

3. **Interaction Testing**

   - Click all navigation links
   - Click all social media buttons
   - Open and close mobile drawer
   - Verify hover states work
   - Verify focus states work

4. **Accessibility Testing**

   - Test keyboard navigation
   - Test with screen reader
   - Verify focus indicators are visible
   - Verify semantic HTML is correct

5. **Cross-Browser Testing**
   - Test in Chrome
   - Test in Firefox
   - Test in Safari
   - Test in Edge

## Implementation Notes

### Migration Order

The migration should follow this specific order to minimize risk:

1. **Setup Phase** (can be done in parallel)

   - Install Tailwind CSS and configure
   - Install shadcn/ui and configure
   - Create utility functions

2. **Leaf Components First** (bottom-up approach)

   - Migrate SEO component (no visual changes)
   - Migrate Link component (minimal styling)
   - Migrate About component (uses Avatar)
   - Migrate Socials component (uses Button)

3. **Composite Components**

   - Migrate Footer component (uses Separator)
   - Migrate Header component (uses Sheet, Button)
   - Migrate MainLayout component (uses Header, Footer)

4. **Page Components**

   - Migrate blog post components
   - Migrate homepage components
   - Migrate page files (index.tsx, etc.)

5. **Cleanup Phase**
   - Remove Material UI dependencies
   - Run all tests
   - Verify build succeeds

### Rollback Strategy

If issues are encountered during migration:

1. **Git Branching**: Perform migration on a feature branch
2. **Incremental Commits**: Commit after each component migration
3. **Testing Checkpoints**: Run tests after each phase
4. **Rollback Point**: If tests fail, revert to last passing commit

### Performance Considerations

**Tailwind CSS Bundle Size**

- Tailwind will purge unused classes in production
- Final CSS bundle should be smaller than Material UI + Emotion
- Expected reduction: ~200KB → ~20KB (gzipped)

**Runtime Performance**

- Tailwind uses utility classes (no runtime CSS-in-JS)
- Should see improved runtime performance vs Emotion
- No theme provider overhead

**Build Time**

- PostCSS processing adds minimal build time
- Tailwind JIT mode provides fast rebuilds in development

### Compatibility Notes

**Next.js 12 Compatibility**

- Tailwind CSS 3.x is fully compatible with Next.js 12
- No changes needed to next.config.js for Tailwind
- PostCSS is already supported by Next.js

**React 17 Compatibility**

- shadcn/ui components work with React 17
- Radix UI primitives support React 17
- No React 18 features are required

**TypeScript Compatibility**

- All shadcn components have TypeScript types
- Tailwind classes work with TypeScript
- No type definition issues expected
