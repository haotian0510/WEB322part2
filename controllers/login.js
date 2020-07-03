const express = require('express');

const router = express.Router();


router.get("/registration", (req, res) => {
    res.render("registration", {
        title: "Registration Page"
    })
});

router.post("/registration", (req, res) => {
    const err = [];
    const pswFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    const { fname, lname, email, psw, pswrepeat } = req.body;
    if (fname == "") {
        err.push("Please enter your first name.");
    }
    if (lname == "") {
        err.push("Please enter your last name.");
    }
    if (email == "") {
        err.push("Please enter your email.");
    }
    if (psw == "") {
        err.push("Please enter password.");
    }
    if (!pswFormat.test(psw)) {
        err.push("Password must contains at least one lower case and one Uppercase and have at least one number and 9 character long");
    }
    if (psw.localeCompare(pswrepeat) != 0) {
        err.push(`Password dose not match.${psw.localeCompare(pswrepeat)}`)
    }

    if (err.length > 0) {
        res.render("registration", {
            title: "Registration Page",
            errors: err
        })
    }

    else {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: `${email}`,
            from: 'hyang113@myseneca.ca',
            subject: 'Registration form submit',
            html: `<strong>Hello, ${fname} ${lname}: </strong> <br>
                    <p>We are happy to inform you that the registration is complete. Your username is ${email}. Thank you </p>`,
        };
        sgMail.send(msg)
        .then(()=>{
            res.render("welcome",{
                title: "Welcome Page"
            })
        })
        .catch(err=>{
            console.log(`Error: ${err}`);
        })
    }

});


router.get("/signin", (req, res) => {
    res.render("signin", {
        title: "Sign In Page"
    })
});
router.post("/signin", (req, res) => {

    const err = [];

    if (req.body.email == "") {
        err.push("You must enter an email.");
    }
    if (req.body.psw == "") {
        err.push("You must enter a password.");
    }

    if (err.length > 0) {
        res.render("signin", {
            title: "Sign In Page",
            errors: err
        })
    }

    else {
        res.redirect("/");
    }

});

module.exports = router;