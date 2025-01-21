import express from 'express';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import customer_routes from './router/auth_users.js';
import genl_routes from './router/general.js';



const app = express();
const PORT =5000;

app.use(express.json());

app.use("/customer",
    session({
        secret:"fingerprint_customer",
        resave: true, 
        saveUninitialized: true
    })
    );

    app.use("/customer/auth/*", (req, res, next) => {
        const auth = req.session.authorization;
      
        if (auth) {
          const token = auth["accessToken"];
      
          jwt.verify(token, "access", (err, user) => {
            if (err) {
              return res.status(403).json({ message: "User not authenticated." });
            }
            req.user = user;
            next();
          });
        } else {
          return res.status(403).json({ message: "User not logged in." });
        }
      });
      
      // Route handlers
      app.use("/customer", customer_routes);
      app.use("/", genl_routes);
      
      // Start the server
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });