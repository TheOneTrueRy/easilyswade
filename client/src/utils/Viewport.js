import { onMounted, onUnmounted, ref } from 'vue'

// NOTE matches the bootstrap `lg` breakpoint, anything narrower (phones + tablets) gets the mobile layouts
const MOBILE_QUERY = '(max-width: 991.98px)'

/**
 * Reactive flag that tracks whether the screen is currently mobile sized.
 * Use it in a component's setup() so the listener is cleaned up when the component unmounts.
 * @returns {import('vue').Ref<boolean>}
 */
export function useIsMobile() {
  const query = window.matchMedia(MOBILE_QUERY)
  const isMobile = ref(query.matches)

  function updateIsMobile(event) {
    isMobile.value = event.matches
  }

  onMounted(() => {
    query.addEventListener('change', updateIsMobile)
  })

  onUnmounted(() => {
    query.removeEventListener('change', updateIsMobile)
  })

  return isMobile
}
