import nodemailer from 'nodemailer';

export const sendMail = async ({ user, subject, orderId }) => {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'krishnabanavathu.vsl@gmail.com',
                pass: 'hazfgwpmuyiufjnj',
            },
        });
        const docRef = doc(firestore, "orders", orderId);
        const order = await getDoc(docRef)
        // const emailHtml =  ReactDOMServer.renderToStaticMarkup(<Email user={user} order={order} subject={subject} />);
        const html = `${subject}`
        const options = {
            from: 'krishnabanavathu.vsl@gmail.com',
            to: user.email,
            subject: subject,
            html: html,
        };
        await transporter.sendMail(options);
    } catch (err) {
        console.error(err);
    }
}

