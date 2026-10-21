import { describe, expect, it } from 'vitest'
import { dayPhase, isOpen, minutesInZone } from '../app/utils/hours'

const hours = { open: '05:00', close: '03:00', timezone: 'Asia/Riyadh' }

/** A Date at the given wall-clock time in Riyadh (UTC+3, no DST). */
function riyadh(hh: number, mm: number): Date {
  return new Date(Date.UTC(2026, 9, 21, hh - 3, mm))
}

describe('isOpen (05:00 to 03:00, Asia/Riyadh)', () => {
  it.each([
    ['04:59', 4, 59, false],
    ['05:00', 5, 0, true],
    ['23:00', 23, 0, true],
    ['02:59', 2, 59, true],
    ['03:00', 3, 0, false]
  ])('%s -> open: %s', (_label, hh, mm, expected) => {
    expect(isOpen(riyadh(hh, mm), hours)).toBe(expected)
  })

  it('uses Riyadh time, not the visitor’s zone', () => {
    // 02:00 UTC is 05:00 in Riyadh, but would be closed if read as local UTC.
    const date = new Date(Date.UTC(2026, 9, 21, 2, 0))
    expect(minutesInZone(date, 'Asia/Riyadh')).toBe(5 * 60)
    expect(isOpen(date, hours)).toBe(true)
  })
})

describe('dayPhase', () => {
  it('is morning from opening until 17:00, night otherwise', () => {
    expect(dayPhase(riyadh(5, 0), hours)).toBe('morning')
    expect(dayPhase(riyadh(16, 59), hours)).toBe('morning')
    expect(dayPhase(riyadh(17, 0), hours)).toBe('night')
    expect(dayPhase(riyadh(1, 30), hours)).toBe('night')
    expect(dayPhase(riyadh(4, 0), hours)).toBe('night')
  })
})
