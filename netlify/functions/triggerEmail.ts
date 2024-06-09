import type { Handler } from "@netlify/functions";
import { sendEmail } from "@netlify/emails";

const handler: Handler = async function(event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as {
    formEmail: string;
    formPhone: string;
    formName: string;
    formBusiness: string;
    formMessage: string;
  };

  console.log(requestBody)

  await sendEmail({
    from: "contact@timelyo.com",
    to: "contact@timelyo.com",
    subject: "Timelyo - Nouveau contact",
    template: "contact",
    parameters: {
      name: requestBody.formName, 
      business: requestBody.formBusiness, 
      phone: requestBody.formPhone, 
      email: requestBody.formEmail, 
      message: requestBody.formMessage
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Contact email sent!"),
  };
};

export { handler };
