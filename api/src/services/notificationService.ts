import { sendMail } from "./verificationService";

export class Notifications {
  static async eventCancellation(
    guests: { email: string; name: string }[],
    eventTitle: string,
    eventDate: Date
  ) {
    const eventDateFormatted = eventDate.toLocaleString();

    for (const guest of guests) {
      await sendMail(
        String(guest.email),
        `Event Cancelled: ${eventTitle}`,
        `<h1>Dear ${guest.name}</h1>
       <p>
        We regret to inform you that the event <strong>${eventTitle}</strong>, 
        originally scheduled for <strong>${eventDateFormatted}</strong>, 
        has been cancelled.
       </p>
       <p>
        We sincerely apologize for any inconvenience caused. 
        If you have any questions, please feel free to reach out to the organizer.
       </p>
       <p><em>Best regards,</em><br>The ConfirmMe Team</p>`
      );
    }
  }

  static async preRegisterGuest(
    name: string,
    email: string,
    eventTitle: string,
    link: string,
    eventDate: Date
  ) {
    const eventDateFormatted = eventDate.toLocaleString();

    await sendMail(
      String(email),
      `🎉 Confirm Your Presence! ${eventTitle}`,
      `<h1>Dear ${name}</h1>
       <p>
        We are excited to invite you to the event <strong>${eventTitle}</strong>, 
        scheduled for <strong>${eventDateFormatted}</strong>.
       </p>
       <p>
        Please confirm your attendance to help us prepare everything for you. 
        We look forward to seeing you there and sharing an amazing experience together!
       </p>
       <p>Link for confirmation: ${link}</p>
       <p><em>Best regards,</em><br>The ConfirmMe Team</p>`
    );
  }
}
