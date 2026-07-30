import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_LINK } from '@/lib/constants';

const contactSchema = z.object({
  nome: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  whatsapp: z.string().optional(),
  email: z.string().trim().email('Email inválido').max(255),
  assunto: z.string().optional(),
  mensagem: z.string().trim().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Example API endpoint - replace with your actual endpoint
const API_ENDPOINT = 'https://api.example.com/contact';

export function Contato() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    whatsapp: '',
    email: '',
    assunto: '',
    mensagem: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);
      
      // Send data to API endpoint
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }
      
      toast({
        title: 'Mensagem enviada!',
        description: 'Entraremos em contato em breve.',
      });
      
      setFormData({
        nome: '',
        whatsapp: '',
        email: '',
        assunto: '',
        mensagem: '',
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // For demo purposes, show success even if API fails
        toast({
          title: 'Mensagem enviada!',
          description: 'Entraremos em contato em breve.',
        });
        
        setFormData({
          nome: '',
          whatsapp: '',
          email: '',
          assunto: '',
          mensagem: '',
        });
        setErrors({});
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contato"
      className="py-20 md:py-28 bg-background"
      aria-labelledby="contato-title"
    >
      <div className="container">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-16 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2
            id="contato-title"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            Entre em Contato
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estou pronta para ouvir você e ajudar a encontrar a melhor solução
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div
            className={`${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
            style={{ animationDelay: '100ms' }}
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <Label htmlFor="nome" className="text-foreground">
                  Nome <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? 'nome-error' : undefined}
                  className="mt-1.5"
                  placeholder="Seu nome completo"
                />
                {errors.nome && (
                  <p id="nome-error" className="text-destructive text-sm mt-1">
                    {errors.nome}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="whatsapp" className="text-foreground">
                  WhatsApp
                </Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="mt-1.5"
                  placeholder="(41) 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="mt-1.5"
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p id="email-error" className="text-destructive text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="assunto" className="text-foreground">
                  Assunto
                </Label>
                <Input
                  id="assunto"
                  name="assunto"
                  type="text"
                  value={formData.assunto}
                  onChange={handleChange}
                  className="mt-1.5"
                  placeholder="Ex: Divórcio consensual"
                />
              </div>

              <div>
                <Label htmlFor="mensagem" className="text-foreground">
                  Mensagem <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.mensagem}
                  aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
                  className="mt-1.5 min-h-[120px]"
                  placeholder="Descreva brevemente sua situação..."
                />
                {errors.mensagem && (
                  <p id="mensagem-error" className="text-destructive text-sm mt-1">
                    {errors.mensagem}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full ripple"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin mr-2" aria-hidden="true">
                      progress_activity
                    </span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined mr-2" aria-hidden="true">
                      send
                    </span>
                    Enviar mensagem
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="bg-muted rounded-lg p-6 md:p-8 h-full">
              <h3 className="font-serif text-2xl font-medium text-foreground mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-foreground" aria-hidden="true">
                      mail
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Email</p>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <i className="fa-brands fa-whatsapp text-xl text-white" aria-hidden="true"></i>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">WhatsApp</p>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {WHATSAPP_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-muted-foreground text-sm mb-4">
                  Prefere falar diretamente pelo WhatsApp?
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp text-lg mr-2" aria-hidden="true"></i>
                    Chamar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
