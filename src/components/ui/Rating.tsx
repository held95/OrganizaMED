import { Star, StarHalf } from 'lucide-react'

interface RatingProps {
  value: number
  max?: number
}

export default function Rating({ value, max = 5 }: RatingProps) {
  const stars = []
  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(value)) {
      stars.push(<Star key={i} className="w-4 h-4 fill-teal text-teal" />)
    } else if (i === Math.ceil(value) && value % 1 !== 0) {
      stars.push(<StarHalf key={i} className="w-4 h-4 fill-teal text-teal" />)
    } else {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />)
    }
  }

  return (
    <div className="flex gap-0.5" aria-label={`${value} de ${max} estrelas`}>
      {stars}
    </div>
  )
}
