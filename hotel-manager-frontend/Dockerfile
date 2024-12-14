# Single Stage: Build and Run Next.js app
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install axios react react-dom
RUN npm install --save-dev typescript @types/react @types/react-dom

# Copy the source code and required files
COPY ./src ./src
COPY ./public ./public
COPY ./next.config.ts ./next.config.ts
COPY ./next-env.d.ts ./next-env.d.ts
COPY ./eslint.config.mjs ./eslint.config.mjs
COPY ./.env.local ./.env.local
COPY ./tsconfig.json ./tsconfig.json
COPY ./tailwind.config.ts ./tailwind.config.ts
COPY ./postcss.config.mjs ./postcss.config.mjs

# Build the Next.js project
RUN npm run build

# Expose the port and start the app
EXPOSE 3000
CMD ["npm", "start"]
