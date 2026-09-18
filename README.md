# OBX — Academy

Open-access learning app on Machine-as-a-Service and outcome-based business models.

Standalone version of the app running at [luisprato.com](https://www.luisprato.com). Strictly black-and-white, React 18 + Vite + TypeScript + Tailwind CSS.

The course content (8 modules, 16 lessons) is bundled as static data in `src/data/academyContent.ts`, so the app runs anywhere with no backend. The AI Course Tutor from the live site is not included here because it requires a server-side AI key; the lesson player and full course library work standalone.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL. No accounts, keys, or backend required.

## Build

```bash
npm run build
npm run preview
```

## License

MIT — see [LICENSE](LICENSE).
