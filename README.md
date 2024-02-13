# Proyecto NOC

El objetivo es crear una serie de tareas usanndo Arquitectura Limpia con
TypeScript

# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD= false

```

3. Ejecutar el comando `npm install`
4. Levantar las base de datos con el comando

```
docker compose up -d
```

5. Ejecutar el comando

```
npx prisma migrate dev
```

6. Ejecutar

```
npm run dev
```
