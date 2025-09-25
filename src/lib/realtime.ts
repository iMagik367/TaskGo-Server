import PusherServer from "pusher";
import PusherClient from "pusher-js";

// Canais
export const CHANNELS = {
  USERS: "taskgo-users",
  PRODUCTS: "taskgo-products",
  SERVICES: "taskgo-services",
};

// Eventos
export const EVENTS = {
  NEW_USER: "new-user",
  USER_UPDATED: "user-updated",
  NEW_PRODUCT: "new-product",
  PRODUCT_UPDATED: "product-updated",
  NEW_SERVICE: "new-service",
  SERVICE_UPDATED: "service-updated",
};

// Server-side Pusher instance
export const pusher = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "sa1",
  useTLS: true,
});

// Client-side Pusher instance
export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "sa1",
});