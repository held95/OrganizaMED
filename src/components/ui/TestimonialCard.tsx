import { Quote } from 'lucide-react'
import Rating from './Rating'

interface TestimonialCardProps {
  name: string
  role: string
  quote: string
  rating: number
}

export default function TestimonialCard({ name, role, quote, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md dark:shadow-gray-900/30 mx-2 flex flex-col h-full">
      <Quote className="w-8 h-8 text-teal/30 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-4">"{quote}"</p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        <div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">{name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
        </div>
        <Rating value={rating} />
      </div>
    </div>
  )
}
