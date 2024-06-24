import nodemailer from 'nodemailer'

//Configuracion
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PWD 
    }
})

//Confirmacion para mi
/*const mailToMe = {
    from: "bmrd@email.com",
    to: process.env.SMTP_USER,
    subject: "Nuevo lead en web",
    text: `Nombre: ${req.body.name} | Apellidos: ${req.body.lastname} | Email: ${req.body.email} | Date: ${new Date()}`
}*/

//Confirmacion para otro usuario
const mailToLead = {
    from: process.env.SMTP_USER,
    subject: "Thanks for contacting me",
    text: "Hi! Thank you for contact me. I'll write you an email as soon as possible!"
}

export const sendEmail = (req,res) => {
    mailToLead.to = `${req.body.email}`

    transporter.sendMail(mailToLead, (err, info) => {
        if (err) {
            console.error(err)
        } else {
            console.log(info)
        }
    })
}
//correo de confirmación para mi
/*export const sendEmailToMe = transporter.sendMail(mailToMe, (err, info) => {
    if (err) {
        console.error(err)
    } else {
        console.log(info)
        res.status(200).json(req.body)
    }
})*/
