import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Diferenciais } from '@/components/Diferenciais';
import { AreasAtuacao } from '@/components/AreasAtuacao';
import { Formacao } from '@/components/Formacao';
import { FAQ } from '@/components/FAQ';
import { Dicas } from '@/components/Dicas';
import { Contato } from '@/components/Contato';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Diferenciais />
        <AreasAtuacao />
        {/*<Formacao />*/}
        <FAQ />
        <Dicas />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
