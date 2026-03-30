# Portfolio

Personal developer portfolio built with React and Vite: hero, projects, experience, skills, tech stack, and a contact form backed by [Web3Forms](https://web3forms.com).

## Stack

- **React 19** + **TypeScript**
- **Vite 6** for dev and production builds
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Framer Motion** for section and UI motion
- **GSAP** + **ScrollTrigger** (stats counters, hero text)
- **Lenis** for smooth scrolling (with anchor links wired through Lenis)
- **lucide-react** for icons

## Scripts

| Command        | Description                          |
|----------------|--------------------------------------|
| `npm run dev`  | Dev server on port **3000** (all interfaces) |
| `npm run build`| Production build to `dist/`          |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Typecheck only (`tsc --noEmit`)      |
| `npm run clean`| Remove `dist/`                       |

## Getting started

```bash
npm install
cp .env.example .env
# Edit .env — see “Contact form” below
npm run dev
```

Open **http://localhost:3000** (or the host/port shown in the terminal).

## Contact form

Submissions are sent via **Web3Forms** to the email you register there.

1. Create a free access key at [web3forms.com](https://web3forms.com).
2. In the project root, create `.env` (never commit real secrets):

   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```

3. Restart `npm run dev` after changing `.env`.

For **production** hosting (Vercel, Netlify, etc.), set the same variable in the dashboard as `VITE_WEB3FORMS_ACCESS_KEY`.

## Static assets

Files in **`public/`** are served from the site root. Reference images with a **leading slash**, for example:

```text
/images/omniFlix.jpg
```

Not `./images/...` (relative URLs break on non-root routes).

### CV / resume download

Add your PDF as **`public/cv.pdf`**. The hero and navbar link to `/cv.pdf` and suggest the filename `Naveen_Yanamala_CV.pdf` when the browser saves the file. To use another path or name, edit `CV_HREF` and `CV_DOWNLOAD_FILENAME` in `src/App.tsx`.

## License

See SPDX headers in source files where applicable (e.g. `App.tsx`).
