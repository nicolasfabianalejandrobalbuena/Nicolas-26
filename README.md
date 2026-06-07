# Judicial Automation Stack

Este proyecto tiene dos servidores independientes:

- `frontend/` — Servidor 1: SPA React + Tailwind
- `backend/` — Servidor 2: Node.js + Express + WebSocket + SQLite

También hay configuraciones de VS Code para ejecutar ambos servidores directamente.

## Estructura de carpetas

```
mi pagina/
├── .vscode/
│   ├── launch.json
│   └── tasks.json
├── backend/
│   ├── .gitignore
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── public/
│   │   ├── index.html
│   │   └── documents/
│   │       ├── documento-judicial-01.pdf
│   │       ├── documento-judicial-02.pdf
│   │       ├── documento-judicial-03.pdf
│   │       ├── documento-judicial-04.pdf
│   │       ├── documento-judicial-05.pdf
│   │       ├── documento-judicial-06.pdf
│   │       ├── documento-judicial-07.pdf
│   │       └── documento-judicial-08.pdf
│   └── src/
│       ├── db.ts
│       ├── index.ts
│       ├── scripts/
│       │   ├── generateDocuments.ts
│       │   └── initDb.ts
│       ├── services/
│       │   ├── notificationService.ts
│       │   └── paymentService.ts
│       └── utils.ts
├── frontend/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── vite-env.d.ts
│       ├── styles/
│       │   └── index.css
│       ├── components/
│       │   ├── AuthShell.tsx
│       │   ├── CartPanel.tsx
│       │   ├── Dashboard.tsx
│       │   ├── DocumentLibrary.tsx
│       │   └── PaymentCheckout.tsx
│       └── lib/
│           ├── api.ts
│           ├── socket.ts
│           └── types.ts
└── app.py
```

## Cómo ejecutar en VS Code

### Opción 1: con Variables de entorno dentro del terminal

#### Backend

```powershell
$env:Path = "C:\Users\nicol\Desktop\mi pagina\node-portable\node-v20.14.0-win-x64;" + $env:Path
cd "C:\Users\nicol\Desktop\mi pagina\backend"
.\npm.cmd run dev
```

#### Frontend

```powershell
$env:Path = "C:\Users\nicol\Desktop\mi pagina\node-portable\node-v20.14.0-win-x64;" + $env:Path
cd "C:\Users\nicol\Desktop\mi pagina\frontend"
.\npm.cmd run dev
```

### Opción 2: desde `.vscode`

1. Abre VS Code en `c:\Users\nicol\Desktop\mi pagina`
2. Presiona `Ctrl+Shift+D`
3. Selecciona `Launch Backend` o `Launch Frontend`
4. O usa el compuesto `Run Full Judicial Stack`

## URLs de acceso

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Notas

- Los archivos de la app de Flask original están en `app.py`, pero para esta arquitectura moderna se utilizan `frontend/` y `backend/`.
- El backend sirve los PDFs desde `backend/public/documents/`.
- El servidor backend también tiene una página de bienvenida en `backend/public/index.html`.
