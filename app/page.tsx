import Image from 'next/image'
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
    <p className="text-3xl font-medium text-sky-700">
      Hello World
      <Button>Click me</Button>
    </p>
    </div>
  )
}
