# Sitio web personal: levantamiento de pesas

Proyecto sencillo para la especializacion en Desarrollo de Software de UniAsturias.

El tema elegido es el levantamiento de pesas. La pagina tiene:

- Introduccion al hobby.
- Galeria de imagenes.
- Formulario para comentarios.
- Cableado para conectar el formulario con un backend futuro usando variables de entorno.
- Modo claro/oscuro guardado como preferencia local.

## Estructura

```txt
packages/client
  index.html
  styles.css
  app.js
  .env.example
```

## Ejecutar frontend

```bash
npm install
npm run dev
```

El frontend queda disponible en:

```txt
http://localhost:5173
```

## Variable de entorno

El frontend usa Vite. La variable queda en `packages/client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3010
```

Con esa variable, el formulario intentara usar:

- `GET /comments`
- `POST /comments`

Si el backend no responde, la pagina muestra un error.
Si la API responde vacio, muestra que todavia no hay comentarios.

`localStorage` solo se usa para guardar la preferencia del modo claro/oscuro.
