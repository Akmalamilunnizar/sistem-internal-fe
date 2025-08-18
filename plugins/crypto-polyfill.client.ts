// Crypto polyfill for client-side
if (process.client) {
  // @ts-ignore
  window.crypto = window.crypto || {}
  
  // Add hash function if it doesn't exist
  if (!window.crypto.hash) {
    // @ts-ignore
    window.crypto.hash = function(data: string) {
      // Simple hash implementation
      let hash = 0
      for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32-bit integer
      }
      return hash.toString(16)
    }
  }
}
