const { addWeeks } = require('date-fns')
const { google } = require('googleapis')
import { fromBase64 } from "../../lib/base64";

export default async (req, res) => {

  const client = await google.auth.getClient({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: fromBase64(process.env.PRIVATE_KEY),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  client.subject = process.env.CLIENT_EMAIL
  const calendarId = process.env.CALENDAR_ID
  const calendar = google.calendar({ version: 'v3', auth: client })

  await calendar.events.list(
    {
      calendarId,
      timeMin: new Date().toISOString(),
      timeMax: addWeeks(new Date(), 1).toISOString(), // Let's get events for one week
      singleEvents: true,
      orderBy: 'startTime',
    },
    (error, result) => {
      if (error) {
        console.log(`The API returned an error: ${error}`)
        res.json(error.message)
      }
      // console.log(result?.data) // All data
      const appointments = await result?.data?.items.map((appointment) => ({
        start: appointment.start.dateTime || appointment.start.date,
        end: appointment.end.dateTime || appointment.end.date,
        id: appointment.id,
        status: appointment.status,
        creator: appointment.creator,
        description: appointment.description,
      }))
      res.json(appointments)
    },
  )
}
