const express = require("express")
const app = express();
const mongoose = require("mongoose");
const dbconnect = require("./config/db_connect");
const session_config = require("./config/session_config");
const path = require("path")
const getDisplayPrice = require("./utils/pricehelper")
const nocache = require("nocache")

require("dotenv").config()
app.use(session_config)
app.use(express.json());

const port = process.env.PORT || 7500;

// Connect to DB and then start server
dbconnect().then(() => {
    const URL = process.env.URL || `http://localhost:${port}`;
    app.listen(port, () => console.log(`server is running at ${URL}`));
}).catch(err => {
    console.error("Failed to connect to database:", err);
});

const flash = require("connect-flash")

app.use(nocache());
app.use(flash());

app.use((req, res, next) => {
    res.locals.errorMessage = req.flash('error');
    res.locals.successMessage = req.flash('success');
    next();
});

app.use((req, res, next) => {
    res.locals.UserId = req.session.user_id || null;
    next();
});

// Static assets
app.use('/assets', express.static(path.join(__dirname, 'public/users/assets')));
app.use('/admin-assets', express.static(path.join(__dirname, 'public/admin/assets')));

// User routes
const user_router = require("./routers/user_router");
app.use('/', user_router)

// Admin routes
const admin_route = require("./routers/admin_router");
app.use('/', admin_route);

const pageload404 = require("./middlewares/404load");
app.use(pageload404);