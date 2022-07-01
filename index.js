const express = require('express')
const app = express()

const pdfParse = require('pdf-parse')

const multer = require('multer')
app.use(multer().any())


app.post('/resumeparser', async (req, res) => {

    try {

        const file = req.files[0].buffer
        let pdfFileText = await pdfParse(file).then(e => e.text)
        let x = pdfFileText.trim().split(/\r?\n/)
        let emailRes = []
        let phoneRes = []
        

        x.forEach(e => {
            if (e.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) != null) {
                emailRes.push(e)
            } else if (e.match(/^(\+\d{1,3}[- ]?)?\d{3}[ ]?\d{3}[ ]?\d{4}$/) != null) {
                phoneRes.push(e)
            }
        })


        let result = {
            'name': `${x[0]}`,
            'phone': `${phoneRes[0]}`,
            'address': `${x[1]}`,
            'email': `${emailRes[0]}`
        }
        res.send(result)

    } catch (error) {
        console.log(error)
    }

})





app.listen(3000, () => console.log('express is running on port 3000'))