import 'dotenv/config';

export default {
  expo: {
    name: "MiAppDeJuegos",
    slug: "mi-app-de-juegos",
    version: "1.0.0",
    extra: {
      apiKey: process.env.EXPO_PUBLIC_API_KEY,
    },
  },
};