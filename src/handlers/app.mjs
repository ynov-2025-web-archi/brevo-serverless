
export const transactionalEmailHandler = async (event) => {

    console.info('Received event:', JSON.stringify(event));

    // Vérification de la méthode HTTP
    if (event.httpMethod && event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: `Method ${event.httpMethod} not allowed. Use POST.` }),
        };
    }
   
    let email = event.email;

    console.log('Email:', email);
    console.log('Event body:', event.body);

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing "email" in request.' }),
        };
    }

    // BODY de la requête
    const emailData = {  
        sender:{  
           email:"dev@zelabstudio.com",
        },
        to:[  
           {  
              email:email,
           }
        ],
        subject:"Hello world",
        htmlContent:"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>"
    }
    
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
            },
            body: JSON.stringify(emailData),
        });
    
        if(!response.ok) {
            throw new Error("Brevo API error", response.message);
        }
    
        const data = await response.json();
    
        console.log('Brevo API response:', data);
    
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        }
    }
    catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
        };
    }
};
