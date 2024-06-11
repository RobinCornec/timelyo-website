import type { Handler } from "@netlify/functions";
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

  const response = await fetch(`${process.env.URL}/.netlify/functions/emails/contact`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      from: "contact@timelyo.com",
      to: "contact@timelyo.com",
      subject: "Timelyo - Nouveau contact",
      parameters: {
        name: requestBody.formName,
        business: requestBody.formBusiness,
        phone: requestBody.formPhone,
        email: requestBody.formEmail,
        message: requestBody.formMessage
      },
    }),
  });

  return {
    statusCode: response.status,
    body: JSON.stringify(response.statusText),
  };
};

export { handler };
