# Implementation Plan: Tailwind CSS and shadcn/ui Migration

## Overview

This implementation plan follows a bottom-up migration approach: infrastructure setup first, then atomic components, composite components, and finally page-level components. Each phase includes testing tasks to validate the migration incrementally.

## Tasks

- [x] 1. Set up Tailwind CSS infrastructure

  - [x] 1.1 Install Tailwind CSS dependencies

    - Install tailwindcss, postcss, and autoprefixer packages
    - Ensure versions are compatible with Next.js 12
    - _Requirements: 1.7, 1.8_

  - [x] 1.2 Create Tailwind configuration file

    - Create tailwind.config.js with content paths for pages/, src/, and components/
    - Configure custom md breakpoint at 900px to match Material UI
    - Extend theme with shadcn/ui color variables
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.5_

  - [x] 1.3 Create PostCSS configuration

    - Create postcss.config.js with tailwindcss and autoprefixer plugins
    - _Requirements: 2.5_

  - [x] 1.4 Create global CSS file with Tailwind directives
    - Create or update src/styles/globals.css with @tailwind directives
    - Add CSS variables for shadcn/ui theme
    - Import globals.css in pages/\_app.tsx
    - _Requirements: 2.6, 2.7, 2.8, 2.9, 2.10_

- [x] 2. Set up shadcn/ui component system

  - [x] 2.1 Install shadcn/ui dependencies

    - Install lucide-react, class-variance-authority, clsx, and tailwind-merge
    - _Requirements: 1.10, 1.11, 1.12_

  - [x] 2.2 Create shadcn/ui configuration

    - Create components.json with TypeScript enabled and component paths
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 2.3 Create utility functions

    - Create lib/utils.ts with cn() function for className merging
    - _Requirements: 3.6_

  - [x] 2.4 Install required shadcn/ui components
    - Run shadcn CLI to install Button, Sheet, Avatar, and Separator components
    - _Requirements: 3.7_

- [x] 3. Checkpoint - Verify infrastructure setup

  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Migrate utility components

  - [x] 4.1 Migrate Link component

    - Remove Material UI imports if present
    - Convert any sx prop styling to Tailwind classes
    - _Requirements: 7.12_

  - [x] 4.2 Migrate SEO component
    - Verify no Material UI dependencies (should be pure Next.js Head)
    - _Requirements: 16.1_

- [x] 5. Migrate atomic shared components

  - [x] 5.1 Migrate About component

    - Replace Material UI Avatar with shadcn Avatar component
    - Replace Material UI Typography with semantic HTML (h3, p) styled with Tailwind
    - Replace Box with div elements using Tailwind flex and gap classes
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.1, 7.2_

  - [ ]\* 5.2 Write property test for About component

    - **Property 3: Material UI Imports Eliminated**
    - **Validates: Requirements 7.1, 7.2**

  - [x] 5.3 Migrate Socials component

    - Replace Material UI Button with shadcn Button component
    - Replace Material UI Typography with semantic HTML styled with Tailwind
    - Replace Material UI icons (LinkedInIcon, AlternateEmailOutlinedIcon) with lucide-react equivalents
    - Replace Box with div elements using Tailwind classes
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.4, 7.5, 10.3, 10.4_

  - [ ]\* 5.4 Write property test for Socials component
    - **Property 3: Material UI Imports Eliminated**
    - **Validates: Requirements 7.4, 7.5, 10.3, 10.4**

- [x] 6. Migrate composite shared components

  - [x] 6.1 Migrate Footer component

    - Replace Material UI Divider with shadcn Separator component
    - Replace Material UI Typography with semantic HTML (p) styled with Tailwind
    - Replace Box with div elements using Tailwind classes
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.3_

  - [ ]\* 6.2 Write property test for Footer component

    - **Property 3: Material UI Imports Eliminated**
    - **Validates: Requirements 7.3**

  - [x] 6.3 Migrate Header component

    - Replace Material UI SwipeableDrawer with shadcn Sheet component
    - Replace Material UI IconButton with shadcn Button component (variant="default", size="icon")
    - Replace Material UI Typography with semantic HTML (span) styled with Tailwind
    - Replace Material UI Box with div elements using Tailwind classes
    - Replace Material UI icons (ExpandMoreIcon, MoreHorizIcon) with lucide-react equivalents (ChevronDown, MoreHorizontal)
    - Convert all sx prop styles to Tailwind utility classes
    - Preserve mobile drawer behavior (opens from bottom)
    - Preserve desktop sidebar behavior (fixed left sidebar at 340px width)
    - Preserve responsive breakpoint at 900px using custom md breakpoint
    - Preserve floating action button positioning on mobile
    - Preserve sticky positioning for header contents
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10, 10.1, 10.2_

  - [ ]\* 6.4 Write property test for Header component

    - **Property 3: Material UI Imports Eliminated**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 10.1, 10.2**

  - [ ]\* 6.5 Write unit tests for Header responsive behavior
    - Test that mobile drawer opens on button click
    - Test that desktop sidebar is visible at md breakpoint
    - _Requirements: 6.6, 6.7, 6.8, 6.9, 6.10_

- [x] 7. Checkpoint - Verify shared components migration

  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Migrate blog-related shared components

  - [x] 8.1 Migrate BlogPostsList component

    - Replace Material UI components with Tailwind-styled equivalents
    - Convert Grid to div with Tailwind grid classes
    - Convert Typography to semantic HTML with Tailwind classes
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.6_

  - [x] 8.2 Migrate Post component

    - Replace Material UI components with Tailwind-styled equivalents
    - Convert Box to div with Tailwind classes
    - Convert Typography to semantic HTML with Tailwind classes
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.7_

  - [x] 8.3 Migrate PostTags component

    - Replace Material UI components with Tailwind-styled equivalents
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.9_

  - [x] 8.4 Migrate PostTitleBody component

    - Replace Material UI components with Tailwind-styled equivalents
    - Convert Typography to semantic HTML with Tailwind classes
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.10_

  - [x] 8.5 Migrate PageTitle component

    - Replace Material UI Typography with semantic HTML (h1) styled with Tailwind
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.8_

  - [x] 8.6 Migrate SectionTitle component

    - Replace Material UI Typography with semantic HTML (h2) styled with Tailwind
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.11_

  - [x] 8.7 Migrate MoreStories component

    - Replace Material UI components with Tailwind-styled equivalents
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 7.13_

  - [ ]\* 8.8 Write property test for blog components
    - **Property 3: Material UI Imports Eliminated**
    - **Validates: Requirements 7.6, 7.7, 7.8, 7.9, 7.10, 7.11, 7.13**

- [x] 9. Migrate layout components

  - [x] 9.1 Migrate MainLayout component

    - Replace Material UI Box with div elements using Tailwind classes
    - Replace Material UI Container with div elements using Tailwind container class
    - Convert all sx prop styles to Tailwind utility classes
    - Preserve flex layout structure
    - Preserve responsive padding values
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]\* 9.2 Write property test for MainLayout component

    - **Property 3: Material UI Imports Eliminated**
    - **Validates: Requirements 5.1, 5.2, 5.3**

  - [ ]\* 9.3 Write unit tests for MainLayout structure
    - Test that layout renders Header and Footer
    - Test that children are rendered in correct container
    - _Requirements: 5.4, 5.5, 5.6_

- [x] 10. Migrate homepage components

  - [x] 10.1 Migrate WeeklySyftableUpdate component

    - Replace Material UI components with Tailwind-styled equivalents
    - Convert Box to div with Tailwind classes
    - Convert Typography to semantic HTML with Tailwind classes
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 8.3_

  - [x] 10.2 Migrate PinnedPosts component

    - Replace Material UI components with Tailwind-styled equivalents
    - Convert Grid to div with Tailwind grid classes
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 8.4_

  - [ ]\* 10.3 Write property test for homepage components
    - **Property 3: Material UI Imports Eliminated**
    - **Validates: Requirements 8.3, 8.4**

- [x] 11. Migrate page files

  - [x] 11.1 Migrate pages/index.tsx

    - Replace Material UI Grid with div elements using Tailwind grid classes
    - Replace Material UI Box with div elements using Tailwind classes
    - Convert all sx prop styles to Tailwind utility classes
    - Preserve existing page layout and visual hierarchy
    - _Requirements: 8.1, 8.2, 8.6_

  - [x] 11.2 Migrate blog page components

    - Identify all blog page components in pages/blog/
    - Replace Material UI components with Tailwind equivalents
    - Convert all sx prop styles to Tailwind utility classes
    - _Requirements: 8.5_

  - [ ]\* 11.3 Write property test for page files
    - **Property 3: Material UI Imports Eliminated**
    - **Validates: Requirements 8.1, 8.2, 8.5**

- [x] 12. Checkpoint - Verify all components migrated

  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Remove Material UI dependencies

  - [x] 13.1 Remove Material UI packages from package.json

    - Remove @mui/material, @mui/icons-material, @emotion/react, @emotion/styled, @mui/styles, @mui/system
    - Run pnpm install to update lock file
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [ ]\* 13.2 Write property test for dependency removal

    - **Property 1: Material UI Dependencies Removed**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**

  - [ ]\* 13.3 Write property test for new dependencies
    - **Property 2: Required Dependencies Installed**
    - **Validates: Requirements 1.7, 1.8, 1.9, 1.10, 1.11, 1.12**

- [ ] 14. Comprehensive codebase validation

  - [ ]\* 14.1 Write property test for Material UI import elimination

    - **Property 3: Material UI Imports Eliminated**
    - Scan all files in src/ and pages/ directories
    - Verify no imports from Material UI packages exist
    - **Validates: Requirements 5.1, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 7.10, 7.11, 7.12, 7.13, 8.1, 8.2, 8.3, 8.4, 8.5, 10.1, 10.2, 10.3, 10.4**

  - [ ]\* 14.2 Write property test for sx prop elimination

    - **Property 4: sx Prop Usage Eliminated**
    - Scan all files in src/ and pages/ directories
    - Verify no sx prop usage exists
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10**

  - [x]\* 14.3 Write property test for Tailwind class adoption
    - **Property 5: Tailwind Classes Present**
    - Scan component files that previously used Material UI
    - Verify className attributes with Tailwind classes are present
    - **Validates: Requirements 5.3, 6.4, 7.6, 8.2, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10**

- [x] 15. Build and TypeScript validation

  - [x]\* 15.1 Write unit test for TypeScript compilation

    - Run tsc --noEmit and verify no errors
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [x]\* 15.2 Write unit test for build process

    - Run pnpm build and verify it completes without errors
    - Verify Tailwind CSS is generated and purged correctly
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

  - [x]\* 15.3 Write unit test for development server
    - Run pnpm dev and verify it starts without errors
    - _Requirements: 14.1_

- [ ] 16. Final checkpoint - Complete migration validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across the codebase
- Unit tests validate specific examples, build processes, and edge cases
- Migration follows bottom-up approach: infrastructure → atomic components → composite components → pages
- Each component migration includes removing Material UI imports, converting sx props to Tailwind classes, and preserving functionality
- Property-based tests should run minimum 100 iterations using fast-check library
- All property tests should be tagged with: **Feature: tailwind-shadcn-migration, Property N: [property text]**
