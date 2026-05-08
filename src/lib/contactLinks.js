const WHATSAPP_NUMBER = '923146793354'

export function makeWhatsappLink(message) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export function makeMailtoLink(email, subject, body) {
  const s = encodeURIComponent(subject)
  const b = encodeURIComponent(body)
  return `mailto:${email}?subject=${s}&body=${b}`
}

export function makeGmailComposeLink(email, subject, body) {
  const to = encodeURIComponent(email)
  const su = encodeURIComponent(subject)
  const b = encodeURIComponent(body)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${b}`
}

export function formatAppointment(dtLocalValue) {
  // dtLocalValue: "YYYY-MM-DDTHH:mm"
  if (!dtLocalValue) return ''
  const d = new Date(dtLocalValue)
  if (Number.isNaN(d.getTime())) return dtLocalValue
  return d.toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

