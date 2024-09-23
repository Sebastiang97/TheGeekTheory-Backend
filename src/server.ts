import express, { Router } from 'express';
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload"
import session from 'express-session';
import passport from 'passport';
import './libs/passport'

interface Options {
  port: number;
  routes: Router;
}


export class Server {

  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  
  
  async start() {
    this.app.use( express.json() );
    this.app.use(
      cors({
        origin : "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        credentials: true
      })
    );

    this.app.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    }));
    this.app.use(morgan("dev"))
    this.app.use(session({
      secret: "mysecret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    
    
    this.app.use( this.routes );
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

}