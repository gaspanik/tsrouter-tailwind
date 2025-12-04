import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import { TreePalm } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mt-4">
        <TreePalm className="w-6 h-6" />
        <h1 className="font-medium text-2xl">Tanstack</h1>
      </div>
    </div>
  )
}
