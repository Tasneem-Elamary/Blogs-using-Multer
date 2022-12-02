import nodeoutlook from 'nodejs-nodemailer-outlook'

export const myEmail=(dest , message) =>{

    
    nodeoutlook.sendEmail({
        auth: {
            user: "tasneemElamary@outlook.com",
            pass: "Tosa7antosa12@"
        },
        from: 'tasneemElamary@outlook.com',
        to: dest,
        subject: 'Hey you, awesome!',
        html: message,
        text: 'This is text version!',
       
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    }
    );
}