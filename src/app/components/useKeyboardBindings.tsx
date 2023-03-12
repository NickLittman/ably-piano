import { useEffect } from 'react'

export default function useKeyboardBindings(spriteMap: { [key: string]: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: { key: string | number }) => {
      const handler = spriteMap[e.key]
      
      if (typeof handler === 'function') {
        handler()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [spriteMap])
}