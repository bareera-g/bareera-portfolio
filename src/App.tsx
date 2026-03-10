import { lazy, Suspense, useState } from 'react'
import Nav from './components/Nav'
import MainContent from './sections/MainContent'
import Splash from './sections/Splash'

const Hero3D = lazy(() => import('./sections/Hero3D'))

function Hero3DFallback() {
  return (
    <section className="min-h-screen flex items-center justify-center blueprint-grid px-6">
      <div className="text-center max-w-2xl animate-pulse">
        <div className="w-44 h-44 mx-auto mb-10 rounded-xl border border-charcoal/[0.06]" />
        <div className="h-8 bg-charcoal/[0.04] rounded-lg max-w-md mx-auto" />
      </div>
    </section>
  )
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      {!splashDone && <Splash onComplete={() => setSplashDone(true)} />}

      <div className={splashDone ? '' : 'invisible'}>
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-beige-100 focus:text-charcoal-solid focus:rounded-lg focus:border focus:border-terracotta/30 focus:text-sm focus:font-medium"
        >
          Skip to projects
        </a>
        <Nav />
        <main>
          <Suspense fallback={<Hero3DFallback />}>
            <Hero3D />
          </Suspense>
          <div className="relative z-40">
            <MainContent />
          </div>
        </main>
      </div>
    </>
  )
}
