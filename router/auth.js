const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { query } = require('../db/conn')
/*router.get('/login', (req, res) => {
    res.render('login');
});*/
function inputCheck(name, pass) {
    if (name === undefined || pass === undefined) {
        return true
    } else return false
}
async function hashPass(pass) {
    const salt = 10
    const hash = await bcrypt.hash(pass, salt);
    return hash
}
async function checkUser(password, hash) {
    return match = await bcrypt.compare(password, hash);
}
router.post('/signup', async (req, res) => {
    if (inputCheck(req.body.name, req.body.pass)) {
        res.status(400).json({
            success: false,
            message: 'Authentication data is not provided!'
        })
    } else {
        const text = 'INSERT INTO poster(name, pass) VALUES($1, $2) RETURNING *'
        try {
            const hash = await hashPass(req.body.pass)
            const values = [req.body.name, hash]
            const user = await query(text, values)
            console.log(user.rows[0])
            res.status(400).json({
                success: true,
                message: 'Done!',
                user: user.rows[0].name
            })
        } catch (err) {
            console.log(err.stack)
        }
    }

});

router.post('/login', async (req, res) => {
    if (inputCheck(req.body.name, req.body.pass)) {
        res.status(400).json({
            success: false,
            message: 'Authentication data is not provided!'
        })
    }
    const text = 'SELECT FROM poster WHERE  (name) = ($1)'
    try {
        const name = req.body.name
        const pass = req.body.pass
        const res = await query(text, name)
        if (!res.rows[0]) {
            res.status(400).json({
                success: false,
                message: 'Wrong login'
            })
        }
        checkUser(pass, res.rows[0].pass)
        if (!checkUser) {
            res.status(400).json({
                success: false,
                message: 'Wrong password'
            })
        }
        console.log(res.rows[0])
        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        console.log(token)
        res.status(200).json({
            success: true,
            token
        });
    } catch (err) {
        console.log(err.stack)
    }
});


module.exports = router;