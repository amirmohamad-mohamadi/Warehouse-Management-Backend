warehouse-app/
├── apps/
│ ├── backend/
│ │ ├── src/
│ │ │ ├── controllers/
│ │ │ │ └── auth/
│ │ │ │ └── authController.ts
│ │ │ ├── middlewares/
│ │ │ │ └── auth/
│ │ │ │ └── validateLoginRequest.ts
│ │ │ ├── models/
│ │ │ │ └── user.ts
│ │ │ ├── routes/
│ │ │ │ └── authRoutes.ts
│ │ │ ├── validators/
│ │ │ │ └── auth/
│ │ │ │ └── loginSchema.ts
│ │ │ ├── utils/
│ │ │ │ └── jwt.ts
│ │ │ ├── config/
│ │ │ │ └── db.ts
│ │ │ ├── types/
│ │ │ │ └── globalTypes.ts
│ │ │ └── index.ts
│ │ ├── .env
│ │ ├── tsconfig.json
│ │ └── package.json
│ └── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── store/
│ │ ├── services/
│ │ ├── types/
│ │ ├── utils/
│ │ ├── assets/
│ │ └── main.tsx
│ ├── index.html
│ ├── tsconfig.json
│ └── package.json
├── docs/
│ ├── README.md
│ ├── architecture.md
│ └── api-specs.md
├── scripts/
│ ├── setup-db.ts
│ └── lint-all.ts
├── .gitignore
├── package.json (root-level for tooling)
└── turbo.json (یا nx.json برای مدیریت monorepo)

apps/
└── backend/
├── src/
│ ├── app.ts ← نقطه‌ی ورود اصلی
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── validators/
│ ├── utils/
│ ├── config/
│ └── types/
├── .env
├── tsconfig.json
└── package.json
