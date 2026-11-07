import { Navbar } from '@/components/Navbar';
import { Hero2 } from '@/components/Hero2';
import { Diferenciais } from '@/components/Diferenciais';
import { AreasAtuacao } from '@/components/AreasAtuacao';
import { AreasAtuacaoB2B } from '@/components/AreasB2B';
import { Formacao } from '@/components/Formacao';
import { FAQ } from '@/components/FAQ';
import { Dicas } from '@/components/Dicas';
import { Instagram } from '@/components/Instagram';
import { Contato } from '@/components/Contato';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero2 />
        <Diferenciais />
        <Instagram />
        <Contato />
        <AreasAtuacao />
        <AreasAtuacaoB2B/>
        {/*<Formacao />*/}
        <FAQ />
        {/* <Dicas /> */}
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollIndicator />
    </div>
  );
};

export default Index;
