# React Native Web Component Playground

An instant, browser-based runtime playground built for rapid prototyping of React Native Web components.

Write your `.tsx` UI code inside a high-performance Monaco Editor and see the changes render instantly in a mobile frame — completely skipping local build, bundling, or compilation wait times.

---

# 🚀 Key Capabilities

## Zero-Wait Hot Reloading

Powered by `@babel/standalone` to transpile and inject dynamic TypeScript JSX directly into the browser runtime the moment you stop typing.

---

## Fluid Device Shell

A responsive mobile mockup container utilizing CSS aspect-ratio scaling to perfectly fit any viewport size without awkward clipping or scrollbars.

---

## Isolate Runtime Crashes

Built-in React Error Boundaries trap execution crashes directly inside the device frame.

Typing a broken reference or typo will never crash the entire dashboard.

---

## Granular Log Splitter

Dedicated nested terminal diagnostics split into:

- **Compiler Errors**
  Syntax/parsing faults

- **Playground Errors**
  Runtime exceptions like undefined variables or invalid styles

---

# 🛠️ Core Tech Stack

| Dependency | Purpose |
| :--- | :--- |
| Next.js 16 (App Router) | Core React framework architectural engine |
| @babel/standalone | Browser-side compilation of React Native components |
| React Native Web | Renders native primitives inside the browser DOM |
| Monaco Editor | Full-featured code editing experience |
| GSAP (GreenSock) | Smooth workspace initialization animations |
| Tailwind CSS | Fluid layout and responsive utility styling |

---

# ⚙️ Installation & Workspace Setup

## 1. Clone the repository

```bash
git clone https://github.com/MujtabaBhatti09/React_Native_Editor_IDE.git

cd React_Native_Editor_IDE
```

---

## 2. Install dependencies

Install the required execution engines and editor packages:

```bash
pnpm install gsap @babel/standalone react-native-web @monaco-editor/react
```

Optional TypeScript definitions:

```bash
pnpm install -D @types/babel__standalone
```

---

## 3. Start the development server

```bash
npx next dev
```

Open:

```txt
http://localhost:3000
```

to begin prototyping components instantly.

---

# 📂 System Architecture Flow

```txt
[ Monaco Editor Code Input ]
                │
                ▼
      [ Babel Standalone ]
                │
         (Parses Syntax)
                │
 ┌──────────────┴──────────────┐
 ▼                             ▼
[ Compiler Error ]      [ Valid JS Block ]
                                      │
                               [ Dynamic Eval ]
                                      │
                              (Mount Component)
                                      │
         ┌────────────────────────────┴────────────────────────────┐
         ▼                                                         ▼
[ Runtime Exception ]                                [ Clean Render ]
         │                                                         │
         ▼                                                         ▼
[ Playground Logs ]                              [ Mobile Preview ]
```

---

# 💡 Configuration Tips

## Frame Aspect Scaling

To adjust the viewport shape of the device container for taller or wider screen testing:

```tsx
<div className="relative h-full max-h-full aspect-[1/1.75] bg-neutral-900">
```

Example:

- `aspect-[1/1.75]`
  Standard mobile layout

- `aspect-[1/2]`
  Ultra-tall device simulation

---

# 🧩 Supported Runtime Libraries

By default, the sandbox safely injects:

- `react`
- `react-native-web`

inside dynamically evaluated code blocks.

You can expand the internal `customRequire` mapper to support additional UI libraries if needed.

---

# ⚡ Goal

Provide an ultra-fast React Native Web prototyping environment where components can be written, evaluated, and visually tested instantly without local native compilation overhead.
