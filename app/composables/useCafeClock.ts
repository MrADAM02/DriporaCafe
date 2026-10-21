import { cafe } from '~~/data/cafe'

/**
 * Open/closed state and hero phase, computed on the client only.
 * Pages are prerendered, so anything time-based stays `null` during SSR and on first hydration,
 * then fills in after mount and refreshes every minute.
 */
export function useCafeClock() {
  const now = ref<Date | null>(null)
  let timer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    now.value = new Date()
    timer = setInterval(() => { now.value = new Date() }, 60_000)
  })
  onBeforeUnmount(() => clearInterval(timer))

  const open = computed(() => (now.value ? isOpen(now.value, cafe.hours) : null))
  const phase = computed(() => (now.value ? dayPhase(now.value, cafe.hours) : null))

  return { now, open, phase }
}
