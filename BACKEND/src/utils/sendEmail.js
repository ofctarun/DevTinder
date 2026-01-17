// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/*
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html.

Purpose:
ses_sendemail.js demonstrates how to send an email using Amazon SES.

Running the code:
node ses_sendemail.js

*/
// snippet-start:[ses.JavaScript.email.sendEmailV3]
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

// const createSendEmailCommand = (toAddress, fromAddress,sub ,body) => {
//   return new SendEmailCommand({
//     Destination: {
//       /* required */
//       CcAddresses: [
//         /* more items */
//       ],
//       ToAddresses: [
//         toAddress,
//         /* more To-email addresses */
//       ],
//     },
//     Message: {
//       /* required */
//       Body: {
//         /* required */
//         Html: {
//           Charset: "UTF-8",
//           Data: `<h1>${body}</h1>`,
//         },
//         Text: {
//           Charset: "UTF-8",
//           Data: "TEXT_FORMAT_BODY",
//         },
//       },
//       Subject: {
//         Charset: "UTF-8",
//         Data: sub,
//       },
//     },
//     Source: fromAddress,
//     ReplyToAddresses: [
//       /* more items */
//     ],
//   });
// };

// const run = async (sub, body) => {
//   const sendEmailCommand = createSendEmailCommand(
//     "narayanashettit@gmail.com",
//     "ofc@tarunn.xyz",
//     sub,
//     body,
//   );

//   try {
//     return await sesClient.send(sendEmailCommand);
//   } catch (caught) {
//     if (caught instanceof Error && caught.name === "MessageRejected") {
//       const messageRejectedError = caught;
//       return messageRejectedError;
//     }
//     throw caught;
//   }
// };

// utils/sendEmail.js
const createSendEmailCommand = (toAddress, fromAddress, sub, bodyHtml) => {
  return new SendEmailCommand({
    Destination: { ToAddresses: [toAddress] },
    Message: {
      Body: {
        Html: { Charset: "UTF-8", Data: bodyHtml },
        Text: { Charset: "UTF-8", Data: "A new connection request is waiting for you!" },
      },
      Subject: { Charset: "UTF-8", Data: sub },
    },
    Source: fromAddress,
  });
};

// Accept 'toEmail' and 'firstName' as arguments
const run = async (toEmail, firstName, senderName) => {
  const subject = `New Connection Request from ${senderName}`;
  
  // Professional HTML Template
  const bodyHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #333;">Hello ${firstName},</h2>
      <p style="font-size: 16px; color: #555;">
        <strong>${senderName}</strong> is interested in connecting with you on DevTinder!
      </p>
      <div style="margin-top: 30px;">
        <a href="http://localhost:5173/requests" 
           style="background-color: #e91e63; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           Review Request
        </a>
      </div>
      <p style="margin-top: 30px; font-size: 12px; color: #999;">
        If you don't recognize this person, you can safely ignore this email.
      </p>
    </div>
  `;

  const sendEmailCommand = createSendEmailCommand(
    "narayanashettit@gmail.com",
    "ofc@tarunn.xyz", // Your verified sender
    subject,
    bodyHtml
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (error) {
    console.error("SES Error:", error);
    throw error;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
export { run };