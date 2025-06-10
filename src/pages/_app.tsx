import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'aos/dist/aos.css'
import '@/styles/globals.css'
import '@/styles/fonts.css'
import AOS from 'aos'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // AOS 초기화
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    })
  }, [])

  return <Component {...pageProps} />
}