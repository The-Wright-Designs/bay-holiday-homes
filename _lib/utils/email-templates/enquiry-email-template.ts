interface EnquiryEmailTemplateProps {
  property: string;
  propertyId: string;
  name: string;
  email: string;
  phone?: string;
  adults: string;
  children: string;
  checkIn?: string;
  checkOut?: string;
  pets?: string;
  notes?: string;
}

export const enquiryEmailTemplate = ({
  property,
  propertyId,
  name,
  email,
  phone,
  adults,
  children,
  checkIn,
  checkOut,
  pets,
  notes,
}: EnquiryEmailTemplateProps) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bay Holiday Homes - Enquiry Form Submission</title>
    <style>
      .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
      .header { background-color: #213766; color: white; padding: 1rem; }
      .content { padding: 1rem; }
      .field { margin-bottom: 0.5rem; }
      .label { font-weight: 500; }
      .value { font-weight: 200; font-style: italic; color: #333; }
      .section-title { font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 0.5rem; color: #213766; }
      .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.9rem; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Bay Holiday Homes</h1>
      </div>
      <div class="content">
        <h2>Property Enquiry</h2>
        <div class="field"><span class="label">Property: </span><span class="value">${property}</span></div>
        <div class="field"><span class="label">Property ID: </span><span class="value">${propertyId}</span></div>
        <div class="field"><span class="label">Name: </span><span class="value">${name}</span></div>
        <div class="field"><span class="label">Email: </span><span class="value">${email}</span></div>
        ${phone ? `<div class="field"><span class="label">Phone: </span><span class="value">${phone}</span></div>` : ""}
        <div class="field"><span class="label">Number of adults: </span><span class="value">${adults}</span></div>
        <div class="field"><span class="label">Number of children: </span><span class="value">${children}</span></div>
        ${checkIn ? `<div class="field"><span class="label">Preferred check-in date: </span><span class="value">${checkIn}</span></div>` : ""}
        ${checkOut ? `<div class="field"><span class="label">Preferred check-out date: </span><span class="value">${checkOut}</span></div>` : ""}
        ${pets ? `<div class="field"><span class="label">Number of pets: </span><span class="value">${pets}</span></div>` : ""}
        ${notes ? `<div class="field"><span class="label">Additional notes: </span><br /><span class="value">${notes}</span></div>` : ""}
      </div>
    </div>
  </body>
</html>`;
};
