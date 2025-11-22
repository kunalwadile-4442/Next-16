# Next.js 16 + Redux Toolkit Starter

A production-ready, modular Next.js 16 starter template featuring Redux Toolkit
(with Persistence), TypeScript, Tailwind CSS v4, Docker, and strict code quality
tools.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) +
  [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Linting & Formatting**: ESLint, Prettier
- **Commit Conventions**: Husky, Commitlint, Commitizen
- **Containerization**: Docker, Docker Compose

## 📂 Project Structure

```
├── lib/
│   ├── features/          # Feature slices
│   │   └── counter/       # Example feature
│   │       ├── counterSlice.ts # Slice actions
│   │       └── types.ts   # Slice types/interfaces
│   ├── store.ts           # Redux store configuration
│   └── utils.ts           # Utility functions
├── public/
│   └── favicon.ico        # Favicon icon
└── src/
    ├── components         # Reusable UI components
    ├── pages              # Pages/routes

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  Install dependencies: \`\`\`bash npm install \`\`\`

2.  Run the development server: \`\`\`bash npm run dev \`\`\`

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 💾 State Management (Redux)

This project uses **Redux Toolkit** for state management and **Redux Persist**
to save state to local storage.

- **Slices**: Located in `lib/features/`. Each feature should have its own
  folder with a slice file.
- **Persistence**: Configured in `lib/store.ts`. Data persists across page
  reloads.

## 🐳 Docker

### Build & Run

\`\`\`bash docker-compose up --build \`\`\`

The app will be available at `http://localhost:3000`.

## 📝 Committing Code

We use **Commitizen** and **Commitlint** to enforce conventional commits.

Instead of `git commit`, use:

\`\`\`bash npm run commit \`\`\`

This will prompt you to choose a commit type (feat, fix, docs, etc.) and write a
structured message.

## 🔍 Code Quality

- **Linting**: `npm run lint`
- **Formatting**: `npm run format`

These checks run automatically on `pre-commit` via Husky.

## 🔎 SEO

SEO metadata is configured in `app/page.tsx` and `app/about/page.tsx` using
Next.js Metadata API.

- Title & Description
- Open Graph (OG) tags for social media sharing
```
