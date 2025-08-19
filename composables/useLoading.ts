export const useLoading = () => {
  const isLoading = ref(false)

  const show = () => {
    isLoading.value = true
  }

  const hide = () => {
    isLoading.value = false
  }

  return {
    isLoading: readonly(isLoading),
    show,
    hide
  }
}
