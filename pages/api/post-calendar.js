const { addMinutes } = require('date-fns')
const { google } = require('googleapis')
import { fromBase64 } from "../../lib/base64";

const credentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: fromBase64(process.env.PRIVATE_KEY),
}

export default async (req, res) => {

  const client = await google.auth.getClient({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
    subject: process.env.CLIENT_EMAIL
  });

  const calendarId = process.env.CALENDAR_ID
  const calendar = google.calendar({ version: 'v3', auth: client })

  const data = JSON.parse(req.body);

  try {
    const newEvent = {
      calendarId,
      resource: {
        start: {
          dateTime: data.startDate,
          timeZone: 'America/Sao_Paulo',
        },
        end: {
          dateTime: addMinutes(new Date(data.startDate), 60).toISOString(),
          timeZone: 'America/Sao_Paulo',
        },
        summary: data.selectedPeople + ' Pessoa(s) Agendadas',
        status: 'confirmed',
        description: `Agendado para ${data.selectedPeople} pessoa(s)`,
      },
    }

    await calendar.events.insert(newEvent)
    res.json({ status: true })
  } catch (error) {

  }
}
