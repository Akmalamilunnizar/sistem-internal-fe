// Node.js polyfill for client-side
if (process.client) {
  // Polyfill crypto module
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.global = window
    
    // Create a simple crypto polyfill
    const cryptoPolyfill = {
      hash: function(data: string) {
        // Simple hash function
        let hash = 0
        if (data.length === 0) return hash.toString()
        for (let i = 0; i < data.length; i++) {
          const char = data.charCodeAt(i)
          hash = ((hash << 5) - hash) + char
          hash = hash & hash // Convert to 32-bit integer
        }
        return hash.toString(16)
      }
    }
    
    // @ts-ignore
    window.crypto = window.crypto || cryptoPolyfill
  }
}
