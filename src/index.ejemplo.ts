import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload"
//import path from "path";
import passport from 'passport';
// import paymentRoutes from "./api/components/payment/payment.routes.js";
// import productRoutes from "./api/components/product/product.routes.js";
// import printRoutes from "./api/components/print/print.routes.js";
// import categoriesRoutes from "./api/components/categories/categories.routes.js";
// import './api/components/auth/auth.js'
import session from "express-session"

const app = express();

app.use(cors());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.json())
app.use(morgan("dev"));

// app.use("/payment", paymentRoutes);
// app.use("/products", productRoutes);
// app.use("/prints", printRoutes);
// app.use("/categories", categoriesRoutes);

function isLoggedIn(req:Request, res:Response, next:NextFunction) {
    req.user ? next() : res.sendStatus(401)
}

app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
    }));

app.get('/auth/google/failure', (_, res) => {
    res.send("wrong")
})

app.get('/auth/protected', isLoggedIn, (req: any, res) => {
    // console.log({ req: req.user })
    let name = req?.user?.displayName || ""
    res.send("Hello " + name)
})

// app.use('/auth/logout', (req, res) => {
//     req?.session.destroy()
//     res.send("see youu ")
// })

app.get('/ping', (_, res) => {
    res.send("pong")
})

app.listen(3000);
console.log("Server on port", 3000);





/*{
  req: {
    provider: 'google',
    sub: '114403523230267551056',
    id: '114403523230267551056',
    displayName: 'jack sanabria',
    name: { givenName: 'jack', familyName: 'sanabria' },
    given_name: 'jack',
    family_name: 'sanabria',
    email_verified: true,
    verified: true,
    language: 'es',
    email: 'jacksanabria17@gmail.com',
    emails: [ [Object] ],
    photos: [ [Object] ],
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocIgXAU4GmBchU3AbfOO2vGOje_32s3_5HL_Wz7JK9sHhzg=s96-c',
    _raw: '{\n' +
      '  "sub": "114403523230267551056",\n' +
      '  "name": "jack sanabria",\n' +
      '  "given_name": "jack",\n' +
      '  "family_name": "sanabria",\n' +
      '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocIgXAU4GmBchU3AbfOO2vGOje_32s3_5HL_Wz7JK9sHhzg\\u003ds96-c",\n' +
      '  "email": "jacksanabria17@gmail.com",\n' +
      '  "email_verified": true,\n' +
      '  "locale": "es"\n' +
      '}',
    _json: {
      sub: '114403523230267551056',
      name: 'jack sanabria',
      given_name: 'jack',
      family_name: 'sanabria',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocIgXAU4GmBchU3AbfOO2vGOje_32s3_5HL_Wz7JK9sHhzg=s96-c',       
      email: 'jacksanabria17@gmail.com',
      email_verified: true,
      locale: 'es'
    }
  }
}*/