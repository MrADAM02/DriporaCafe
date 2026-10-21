// Opening-hours logic. Pure functions so they can be unit-tested without Nuxt.

export type Hours = { open: string; close: string; timezone: string }

export type DayPhase = 'morning' | 'night'

/** "05:00" -> 300 */
export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Minutes since midnight for `date` as seen in `timeZone`, regardless of the visitor's own zone. */
export function minutesInZone(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date)
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value)
  return get('hour') * 60 + get('minute')
}

/** Open from `open` (inclusive) to `close` (exclusive). Handles hours that wrap past midnight. */
export function isOpenAtMinutes(minutes: number, open: number, close: number): boolean {
  if (open === close) return true
  if (open < close) return minutes >= open && minutes < close
  return minutes >= open || minutes < close
}

export function isOpen(date: Date, hours: Hours): boolean {
  return isOpenAtMinutes(minutesInZone(date, hours.timezone), toMinutes(hours.open), toMinutes(hours.close))
}

/** Hero mood: morning from opening until 17:00, night after that. */
export function dayPhase(date: Date, hours: Hours): DayPhase {
  const m = minutesInZone(date, hours.timezone)
  return m >= toMinutes(hours.open) && m < 17 * 60 ? 'morning' : 'night'
}

/** Formats "05:00" for display with Western digits, e.g. "5:00 AM" or "5:00 ص". */
export function formatTime(hhmm: string, locale: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  return new Intl.DateTimeFormat(`${locale}-u-nu-latn`, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  }).format(new Date(Date.UTC(2000, 0, 1, h, m)))
}
