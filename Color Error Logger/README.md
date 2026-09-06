# error-color-logger

> Print your errors in colors — because a wall of white text never told anyone what went wrong.

A tiny, zero-config TypeScript logger that prints HTTP-style errors to the console with a distinct color style per status code. Ships with its own `ClientError` class and a `StatusCode` enum, so you can throw, catch, and log with one consistent shape.

---

## Installation

```bash
npm install error-color-logger
```

Written in TypeScript, published with type declarations — no `@types/*` package needed.

---

## Quick start

```ts
import { errorColorLogger, ClientError, StatusCode } from "error-color-logger";

try {
    throw new ClientError(StatusCode.NotFound, "User 42 does not exist");
} catch (err) {
    if (err instanceof ClientError) {
        errorColorLogger.logError(err);
    }
}
```

Output:

```
Status code: 404 || Error message: User 42 does not exist
```

…where `404` is printed in the red style reserved for `404`, and the message in bold red.

---

## Why the status code changes style

Every supported status code gets its **own** red treatment. Once you have used the package for a week you start recognizing errors by their look before you finish reading them — a `429` never gets mistaken for a `400`.

| Status | Enum member            | Style              |
| -----: | ---------------------- | ------------------ |
|  `400` | `BadRequest`           | red                |
|  `401` | `Unauthorized`         | red + bold         |
|  `403` | `Forbidden`            | red + dim          |
|  `404` | `NotFound`             | red + italic       |
|  `409` | `Conflict`             | red + underline    |
|  `422` | `UnprocessableContent` | red + inverse      |
|  `429` | `TooManyRequest`       | red background     |
|  `500` | `InternalServerError`  | red background + bold |

The error message itself is always printed in **bold red**, so the text stays readable while the code carries the visual signature.

---

## API

### `errorColorLogger.logError(clientError)`

Prints one formatted line to `stdout` via `console.log`.

| Parameter     | Type          | Description                          |
| ------------- | ------------- | ------------------------------------ |
| `clientError` | `ClientError` | The error to print. Read for its `status` and `message`. |

Returns `void`.

`errorColorLogger` is a ready-made singleton — construct nothing, configure nothing.

### `new ClientError(status, message)`

A small error value carrying an HTTP status alongside its text.

| Property  | Type         | Description                    |
| --------- | ------------ | ------------------------------ |
| `status`  | `StatusCode` | The HTTP status code. Readonly. |
| `message` | `string`     | Human-readable description. Readonly. |

```ts
const err = new ClientError(StatusCode.Unauthorized, "Token expired");
err.status;   // 401
err.message;  // "Token expired"
```

### `StatusCode`

A numeric enum of the usual suspects, so you stop hardcoding magic numbers:

```ts
// Success
StatusCode.OK                    // 200
StatusCode.Created               // 201
StatusCode.NoContent             // 204

// Client errors
StatusCode.BadRequest            // 400
StatusCode.Unauthorized          // 401
StatusCode.Forbidden             // 403
StatusCode.NotFound              // 404
StatusCode.Conflict              // 409
StatusCode.UnprocessableContent  // 422
StatusCode.TooManyRequest        // 429

// Server errors
StatusCode.InternalServerError   // 500
```

A `Role` enum (`Admin`, `User`) also ships alongside it.

---

## Using it in an Express error handler

The natural home for this package — one middleware, every error in the app color-coded:

```ts
import { errorColorLogger, ClientError, StatusCode } from "error-color-logger";
import { Request, Response, NextFunction } from "express";

export function catchAll(err: unknown, req: Request, res: Response, next: NextFunction) {

    const clientError = err instanceof ClientError
        ? err
        : new ClientError(StatusCode.InternalServerError, String(err));

    errorColorLogger.logError(clientError);

    res.status(clientError.status).send(clientError.message);
}
```

---

## Good to know

- **Only the eight status codes in the table above have a style.** Passing any other code currently throws, so map unknown values onto one of the supported codes (`InternalServerError` is the usual fallback) before logging.
- **`ClientError` does not extend `Error`.** It is a plain data class, so it carries no `.stack` and won't format like a native error if something else logs it. Deliberate — it keeps the object small and printable.
- **Colors come from [`colors`](https://www.npmjs.com/package/colors) v1.4**, which strips ANSI codes automatically when output is not a TTY. Piping to a file gives you clean, unescaped text.

---

## Requirements

- Node.js 18 or newer
- TypeScript 5+ if you are consuming the types

---

## Contributing / local development

```bash
npm install
npm run build      # compiles src/ to build/ via tsc
```

Source lives in `src/`, compiled output in `build/`. The entry point is `src/index.ts`.

---

## License

ISC © Tomer Sherman

Happy coding :-)
