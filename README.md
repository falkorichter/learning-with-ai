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

## Live Site

Visit the live site at: [https://falkorichter.github.io/learning-with-ai/](https://falkorichter.github.io/learning-with-ai/)

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
