import { useEffect, useState } from 'react'

export function HomePage() {
  const [response, setResponse] = useState<string>()

  useEffect(() => {
    console.log(window.electron.ping)

    window.electron.greeting.ping()
      .then(result => {
        setResponse(result)
      })

    window.electron.greeting.reject()
      .catch(error => {
        console.error(`error caught:`, error)
      })
  }, [])

  return (
    <div className={'bg-purple-950'}>
      <div className={'text-purple-200'}>
        <p>Hello, {response}!</p>
        <span>Try to edit file: src/windows/MainWindow/renderer/pages/home/index.tsx</span>
      </div>
    </div>
  )
}

