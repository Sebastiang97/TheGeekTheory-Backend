import { AppRoutes } from "./routes";
import { Server } from "./server";
import dotenv from 'dotenv'




(async () => {
  dotenv.config()
  main();
})();


function main() {
  const port = process.env.PORT || 4000;
  console.log({port})
  console.log(process.env.PORT)
  const server = new Server({
    port: typeof port === "string" ? Number(port) : port,
    routes: AppRoutes.routes
  });

  server.start();
}