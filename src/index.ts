import { AppRoutes } from "./routes";
import { Server } from "./server";
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);




(async () => {
  main();
})();


function main() {

  const server = new Server({
    port: 3000,
    routes: AppRoutes.routes
  });

  server.start();
}