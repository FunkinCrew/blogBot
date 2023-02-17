FROM denoland/deno:latest as base

WORKDIR /app

COPY . ./

RUN deno cache main.ts

CMD ["run", "-A", "main.ts"] 