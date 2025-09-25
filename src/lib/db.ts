import { createClient } from '@vercel/postgres';

// Check if we're in build mode
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

// Create a mock client for build time that matches the PostgreSQL client interface
const mockClient = {
  query: async () => Promise.resolve({ rows: [], rowCount: 0 }),
  connect: async () => Promise.resolve(),
  end: async () => Promise.resolve(),
  release: async () => Promise.resolve(),
};

// Create the real client for runtime, but wrap in a try/catch to handle missing connection string
let realClient;
try {
  realClient = createClient({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
  });
} catch {
  // If creating the client fails (e.g. missing connection string), use mock client
  realClient = mockClient;
}

// Use mock client during build, real client during runtime
export const db = isBuildTime ? mockClient : realClient;