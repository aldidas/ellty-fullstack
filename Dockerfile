# Stage 1: Build the Next.js application
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine
RUN apk add --no-cache openssl3

# Set the working directory
WORKDIR /app

# Copy the built application from the 'build' stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/generated ../ROOT/generated
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["sh", "-c", "npm run db:deploy && npm run start"]
