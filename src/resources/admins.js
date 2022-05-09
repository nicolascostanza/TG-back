const express = require("express");
const admins = require("../data/admins.json");
const fs = require("fs");
const router = express.Router();


// GET ADMINS 

router.get("/", (req, res) => {
    res.send(admins)
});

router.get("/:id", (req, res) => {
    const adminID = req.params.id;
    const admin = admins.find((admin) => admin.id == adminID);
    if (admin) {
        res.send(admin);
    } else {
        res.send(`Admin with id ${adminID} does not exist`);
    }
});

router.get("/getByName/:firstName", (req, res) => {
    const adminFirstName = req.params.firstName;
    const admin = admins.filter((admin) => admin.firstName == adminFirstName);
    if (admin) {
        res.send(admin);
    } else {
        res.send("Admin not found");
    }
});

router.get("/getByLastName/:lastName", (req, res) => {
    const adminLastName = req.params.lastName;
    const admin = admins.find((admin) => admin.lastName == adminLastName);
    if (admin) {
        res.send(admin);
    } else {
        res.send("Admin not found");
    }
});

router.get('/getByStatus/:active', (req, res) => {
    const adminStatus = req.params.active;
    const filteredAdmins = admins.filter((admin) => admin.active.toString() === adminStatus);
    if (filteredAdmins.length > 0) {
        res.send(filteredAdmins);
    } else {
        res.send('Admin not found');
    }
});

// DELETE ADMINS

router.delete("/delete/:id", (req, res) => {
    const adminID = req.params.id;
    const deleteAdmin = admins.filter((admin) => admin.id !== adminID);
    if (admins.length === deleteAdmin.length) {
        res.status(404);
        res.send(`Could not delete because admin with id ${adminID} was not found`);
    } else {
        fs.writeFile("src/data/admins.json", JSON.stringify(deleteAdmin), (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send(`Admin with id ${adminID}`);
            }
        });
    }
})

module.exports = router;