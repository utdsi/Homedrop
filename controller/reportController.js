const { UserModel } = require("../model/user.model")
const { ReportModel } = require("../model/report.model")




const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

require('dotenv').config()


exports.report = async (req, res) => {

    const { email } = req.body

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const doc = new PDFDocument();


        doc.fontSize(20).text('Welcome to our Website', { align: 'center' });
        doc.fontSize(20).text('PDF Report', { align: 'center' });
        doc.fontSize(12).text('Generated on: ' + new Date().toLocaleString(), { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(16).text(`User Email: ' + ${email}`, { align: 'center' });



        const pdfBuffer = await new Promise(resolve => {
            const buffers = [];
            doc.on("data", buffer => buffers.push(buffer));
            doc.on("end", () => resolve(Buffer.concat(buffers)));
            doc.end();
        });
        const pdfBase = pdfBuffer.toString("base64");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: 'utkarshsinha854@gmail.com',
                pass: process.env.google,
            },
        });

        const mailOptions = {
            from: 'utkarshsinha854@gmail.com',
            to: email,
            subject: 'Report',
            text: 'Here is your report.',
            attachments: [
                {
                    filename: 'sendreport.pdf',
                    content: pdfBase,
                    type: "application/pdf"
                },
            ],
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: 'Error sending email' });
            }

            const report = new ReportModel({ email, "sent": true })
            await report.save()
            return res.status(200).json({ message: 'Report has been sent successfully to your mail' });
        });

    } catch (error) {

        console.log(error)

        return res.status(500).json({ error: 'Server error' });

    }


}



exports.get_reports = async (req, res) => {


    const { id } = req.body

    try {

        const reports = await ReportModel.find({ "email": id })
        res.status(200).send(reports)
    } catch (error) {

        res.status(500).json({ error: 'Server error' });

    }
}