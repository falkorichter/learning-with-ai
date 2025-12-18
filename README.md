# Learning with AI

Interactive learning tools and vocabulary trainers hosted on GitHub Pages.

## Features

- **Appearance Vocabulary Trainer**: Learn English vocabulary related to appearance and describing people
- **Dynamic Vocabulary Trainer**: Flexible vocabulary trainer with Markdown configuration

## Preview Branches

This repository is configured to automatically deploy preview versions of pull requests. When you open a pull request:

1. A preview deployment will be automatically created
2. The preview will be accessible at: `https://falkorichter.github.io/learning-with-ai/pr-preview/pr-{number}/`
3. The preview will be updated automatically when you push new commits
4. The preview will be removed when the pull request is closed or merged

This feature is powered by the [PR Preview Action](https://github.com/marketplace/actions/preview-pages).

## Development

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the CSS (required after any Tailwind class changes):
   ```bash
   npm run build:css
   ```

3. For development with auto-rebuild on changes:
   ```bash
   npm run watch:css
   ```

### Making Changes

- Edit the HTML files directly
- If you add new Tailwind CSS classes, run `npm run build:css` to regenerate the CSS
- Create a pull request - your changes will be automatically deployed to a preview URL for review

## Architecture Decisions

### External Dependencies

This project uses a hybrid approach for external dependencies:

#### CDN-Hosted Libraries (Current)
- **React 18** - via unpkg CDN
- **ReactDOM 18** - via unpkg CDN
- **Babel Standalone** - via unpkg CDN
- **Font Awesome 6.4.0** - via cdnjs CDN
- **Google Fonts (Inter)** - via Google Fonts CDN

#### Locally Built
- **Tailwind CSS** - built from source and versioned in `/dist/output.css`

#### Why Use CDN for React/Babel?

**Decision**: Keep using CDN with proper CORS attributes

**Reasoning**:
1. **Project Scope**: This is a learning tool with simple single-page apps using inline JSX
2. **React Documentation**: [React's official docs](https://react.dev/learn/add-react-to-an-existing-project) state: "If you're learning React or experimenting, you can use React from a CDN"
3. **Simplicity**: No build process needed for JavaScript - keeps contributing easy
4. **Repository Size**: Avoids committing ~500KB of minified JavaScript
5. **Safari Compatibility**: The `crossorigin="anonymous"` attribute resolves Safari's privacy warnings while maintaining CDN benefits

**Trade-offs Accepted**:
- ❌ Requires internet connection for development
- ❌ External dependency on CDN availability
- ✅ Easier for contributors (no JS build step)
- ✅ Smaller repository size
- ✅ Faster load times via CDN caching

#### When to Reconsider

Consider vendoring (hosting locally) if:
- The app grows in complexity and needs a proper build system
- Offline functionality becomes a requirement
- Corporate/enterprise deployment where external CDNs are blocked
- Need stricter security controls over dependencies

To vendor the dependencies:
1. Download the production builds from unpkg
2. Place them in a `/vendor` or `/lib` directory
3. Update HTML `<script>` tags to reference local paths
4. Consider adding Subresource Integrity (SRI) hashes for security

## Live Site

Visit the live site at: [https://falkorichter.github.io/learning-with-ai/](https://falkorichter.github.io/learning-with-ai/)

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
