import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import FormField from '../ui/FormField'
import Button from '../ui/Button'
import Toast from '../ui/Toast'
import { contactFormSchema, type ContactFormData } from '../../lib/schemas'
import type { FormStatus } from '../../types'

const contactInfo = [
  { icon: Phone, label: 'Telefone', value: '(11) 3456-7890' },
  { icon: Mail, label: 'Email', value: 'contato@organizamed.com.br' },
  { icon: MapPin, label: 'Endereco', value: 'Av. Brig. Faria Lima, 1811, Jardim Paulistano, Sao Paulo - SP, 01452-001' },
  { icon: Clock, label: 'Horario', value: 'Seg-Sex 7h-20h | Sab 8h-14h' },
]

const departments = [
  { value: 'geral', label: 'Clinica Geral' },
  { value: 'cardiologia', label: 'Cardiologia' },
  { value: 'emergencia', label: 'Emergencia' },
  { value: 'laboratorio', label: 'Laboratorio' },
  { value: 'telemedicina', label: 'Telemedicina' },
]

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({ message: '', type: 'success', visible: false })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const hideToast = useCallback(() => setToast((t) => ({ ...t, visible: false })), [])

  const onSubmit = async (_data: ContactFormData) => {
    setStatus('submitting')
    await new Promise((r) => setTimeout(r, 2000))
    const success = Math.random() > 0.05
    if (success) {
      setStatus('success')
      setToast({ message: 'Mensagem enviada com sucesso! Retornaremos em ate 24h.', type: 'success', visible: true })
      reset()
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('error')
      setToast({ message: 'Erro ao enviar. Tente novamente.', type: 'error', visible: true })
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contato" className="py-20 bg-white dark:bg-gray-800" aria-labelledby="contato-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading id="contato-heading" title="Fale Conosco" subtitle="Estamos prontos para atender voce" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{info.label}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-offwhite dark:bg-gray-900 rounded-xl p-6 md:p-8 shadow-sm dark:shadow-gray-900/30">
              <FormField label="Nome completo" type="text" placeholder="Seu nome" registration={register('fullName')} error={errors.fullName} />
              <FormField label="Email" type="email" placeholder="seu@email.com" registration={register('email')} error={errors.email} />
              <FormField label="Telefone" type="tel" placeholder="(11) 99999-9999" registration={register('phone')} error={errors.phone} />
              <FormField
                label="Departamento"
                type="select"
                placeholder="Selecione o departamento"
                registration={register('department')}
                error={errors.department}
                options={departments}
              />
              <FormField label="Mensagem" type="textarea" placeholder="Como podemos ajudar?" registration={register('message')} error={errors.message} />
              <Button type="submit" className="w-full" isLoading={status === 'submitting'}>
                Enviar Mensagem
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />
    </section>
  )
}
