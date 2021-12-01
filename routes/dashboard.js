const { Router } = require('express');
const router = new Router();

// @desc Dashboard
// @desc GET /dashboard
router.get("/", (req, res) => {
  res.render("dashboard", { pageTitle: 'داشبورد | بخش مدریت', path: "/dashboard", layout: './layouts/dashLayout'})
})

// @desc Login Page
// @route GET /dashboard/login
router.get('/login', (req, res) => {
  res.render("login", { pageTitle: "ورود به بخش مدریت", path: '/login' })
})

module.exports = router