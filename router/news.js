const { query } = require('../db/conn')

module.exports = {
    addRow: async (req, res) => {
        const text = ' INSERT INTO news(title, content, date, source) VALUES($1, $2, $3, $4) RETURNING *'
        try {
            const values = [req.body.title, req.body.content, Date.now(), req.body.source]
            const news = await query(text, values)
            res.status(400).json({
                success: true,
                message: 'Done!',
                news: news.rows[0]
            })
        } catch (err) {
            console.log(err.stack)
        }
    },
    updateRow: async (req, res) => {
        const text = ' UPDATE news SET content =($1) WHERE id = ($2) RETURNING *'
        try {
            const values = [req.body.content, req.params.id]
            const news = await query(text, values)
            res.status(400).json({
                success: true,
                message: 'Done!',
                news: news.rows[0]
            })
        } catch (err) {
            console.log(err.stack)
        }
    },
    deleteRow: async (req, res) => {
        const text = ` DELETE FROM
        news
        WHERE
        id = ($1)`
        try {
            const values = [req.params.id]
            const news = await query(text, values)
            res.status(400).json({
                success: true,
                message: 'Done!',
            })
        } catch (err) {
            console.log(err.stack)
        }
    },
    readRow: async (req, res) => {
        const text = ` SELECT * FROM news`
        try {
            const news = await query(text)
            res.status(400).json({
                success: true,
                message: 'Done!',
                news: news.rows
            })
        } catch (err) {
            console.log(err.stack)
        }
    }
}