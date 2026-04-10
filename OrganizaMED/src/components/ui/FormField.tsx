import type { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import { cn } from '../../lib/cn'

interface FormFieldProps {
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  placeholder: string
  registration: UseFormRegisterReturn
  error?: FieldError
  options?: { value: string; label: string }[]
}

export default function FormField({ label, type, placeholder, registration, error, options }: FormFieldProps) {
  const baseClasses = cn(
    'w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal',
    error ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100',
  )

  const id = registration.name

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      {type === 'select' ? (
        <select id={id} className={cn(baseClasses, 'appearance-none')} aria-invalid={!!error} {...registration}>
          <option value="">{placeholder}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea id={id} rows={4} placeholder={placeholder} className={cn(baseClasses, 'resize-none')} aria-invalid={!!error} {...registration} />
      ) : (
        <input id={id} type={type} placeholder={placeholder} className={baseClasses} aria-invalid={!!error} {...registration} />
      )}
      {error && <p className="mt-1 text-sm text-red-500" id={`${id}-error`}>{error.message}</p>}
    </div>
  )
}
