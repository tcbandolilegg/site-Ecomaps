import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Recycle, 
  Menu, 
  X,
  ArrowUpRight,
  Zap,
  Info,
  Battery,
  Tv,
  Wine,
  FileText,
  AlertCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// --- Data ---

type Category = 'plastic' | 'glass' | 'paper' | 'metal' | 'electronics' | 'battery';

interface CategoryInfo {
  label: string;
  icon: any;
  color: string;
  description: string;
  canRecycle: string[];
  cannotRecycle: string[];
}

const CATEGORY_DETAILS: Record<Category, CategoryInfo> = {
  plastic: {
    label: 'Plástico',
    icon: Recycle,
    color: 'bg-red-500',
    description: 'Um dos materiais mais comuns e versáteis, mas que exige atenção redobrada na separação.',
    canRecycle: ['Garrafas PET', 'Potes de alimentos', 'Frascos de higiene e limpeza', 'Tampas plásticas'],
    cannotRecycle: ['Cabos de panela', 'Tomadas', 'Adesivos', 'Plásticos metalizados (salgadinhos)']
  },
  glass: {
    label: 'Vidro',
    icon: Wine,
    color: 'bg-emerald-500',
    description: 'O vidro é 100% reciclável e pode ser reutilizado infinitas vezes sem perder a qualidade.',
    canRecycle: ['Garrafas de bebidas', 'Potes de conservas', 'Frascos de perfumes', 'Copos de vidro comum'],
    cannotRecycle: ['Espelhos', 'Cristais', 'Lâmpadas', 'Cerâmicas e porcelanas', 'Vidros temperados']
  },
  paper: {
    label: 'Papel',
    icon: FileText,
    color: 'bg-blue-500',
    description: 'A reciclagem de papel economiza água e preserva florestas. Deve estar sempre limpo e seco.',
    canRecycle: ['Papelão', 'Jornais e revistas', 'Folhas de caderno', 'Envelopes'],
    cannotRecycle: ['Papel carbono', 'Papel higiênico usado', 'Fitas adesivas', 'Papéis sujos de gordura']
  },
  metal: {
    label: 'Metal',
    icon: Zap,
    color: 'bg-amber-500',
    description: 'Metais como o alumínio possuem alto valor de reciclagem e processamento rápido.',
    canRecycle: ['Latas de alumínio', 'Latas de aço (conservas)', 'Tampas de metal', 'Arames e pregos'],
    cannotRecycle: ['Esponjas de aço', 'Grampos', 'Latas de tinta ou verniz', 'Pilhas (têm categoria própria)']
  },
  electronics: {
    label: 'Eletrônicos',
    icon: Tv,
    color: 'bg-purple-500',
    description: 'Resíduos eletrônicos contêm metais pesados e não devem ser descartados no lixo comum.',
    canRecycle: ['Computadores e tablets', 'Celulares e carregadores', 'Placas de circuito', 'Eletrodomésticos'],
    cannotRecycle: ['Toners de impressora (descarte especial)', 'Lâmpadas fluorescentes']
  },
  battery: {
    label: 'Pilhas/Baterias',
    icon: Battery,
    color: 'bg-orange-500',
    description: 'Altamente tóxicos se vazarem. Precisam de logística reversa e pontos de coleta específicos.',
    canRecycle: ['Pilhas AA, AAA, C e D', 'Baterias de eletrônicos', 'Baterias de lítio e botão'],
    cannotRecycle: ['Baterias de chumbo-ácido (carro) - Exigem descarte em revendedores']
  }
};

// --- Components ---

function InfoModal({ category, onClose }: { category: Category | null, onClose: () => void }) {
  if (!category) return null;
  const info = CATEGORY_DETAILS[category];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className={`${info.color} p-8 text-white relative`}>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl">
              <info.icon className="w-10 h-10" />
            </div>
            <div>
              <Badge variant="outline" className="text-white border-white/40 mb-2 font-bold tracking-wider">Informativo</Badge>
              <h2 className="text-4xl font-display font-bold tracking-tight">{info.label}</h2>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <p className="text-lg text-zinc-600 leading-relaxed italic">{info.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-[10px]">
                <CheckCircle2 className="w-4 h-4" />
                O que descartar
              </div>
              <ul className="space-y-2">
                {info.canRecycle.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-700 bg-emerald-50 px-3 py-2 rounded-xl text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-[10px]">
                <AlertCircle className="w-4 h-4" />
                O que NÃO descartar
              </div>
              <ul className="space-y-2">
                {info.cannotRecycle.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-700 bg-red-50 px-3 py-2 rounded-xl text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-100 gap-4">
             <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
               <Info className="w-4 h-4" />
               Informação baseada em normas ambientais.
             </div>
             <Button onClick={onClose} className="w-full sm:w-auto rounded-xl h-12 px-8 bg-zinc-900 hover:bg-zinc-800">Entendido</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between glass px-6 py-3 rounded-full transition-all ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase">ECO Ponto</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['Início', 'Categorias', 'Dicas', 'Sobre'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Início' ? '#' : `#${item.toLowerCase()}`} 
                  className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="#sobre">
                <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-md">Onde Descartar?</Button>
              </a>
            </div>

            <button className="md:hidden p-2 text-zinc-600" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-2xl text-emerald-600 uppercase">ECO Ponto</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-zinc-100 rounded-full"><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-8 text-center text-2xl font-display font-medium text-zinc-800">
              {['Início', 'Categorias', 'Dicas', 'Sobre'].map(item => (
                <a 
                  key={item} 
                  href={item === 'Início' ? '#' : `#${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeCategory && <InfoModal category={activeCategory} onClose={() => setActiveCategory(null)} />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-widest border border-emerald-100 uppercase">
                🌱 Guia de Descarte Consciente
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-bold tracking-tight leading-[0.95]"
            >
              Recicle seu <span className="text-gradient">conhecimento</span> antes do seu lixo.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed"
            >
              O primeiro passo para a sustentabilidade é a informação. Aprenda a separar 
              seus resíduos corretamente e descubra o que pode ser transformado.
            </motion.p>
          </div>
        </div>

        {/* Floating Abstract Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/20 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/4" />
      </section>

      {/* Info Categories Grid */}
      <section id="categorias" className="py-24 bg-white border-y border-zinc-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">O que você vai descartar?</h2>
               <p className="text-zinc-500">Selecione uma categoria para aprender como realizar o descarte correto.</p>
            </div>
            <ArrowUpRight className="w-12 h-12 text-zinc-100 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {(Object.keys(CATEGORY_DETAILS) as Category[]).map((cat, i) => {
               const Config = CATEGORY_DETAILS[cat];
               return (
                  <motion.div 
                    key={cat}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveCategory(cat)}
                    className="p-8 rounded-[40px] bg-zinc-50 border border-zinc-100 flex items-center justify-between cursor-pointer hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden relative"
                  >
                    <div className="flex items-center gap-6 relative z-10">
                      <div className={`w-16 h-16 ${Config.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Config.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl group-hover:text-emerald-600 transition-colors">{Config.label}</h3>
                        <p className="text-xs font-semibold text-zinc-400 mt-1">Guia completo</p>
                      </div>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-600 group-hover:text-white transition-all relative z-10">
                      <ChevronRight className="w-5 h-5" />
                    </div>

                    <div className={`absolute top-0 right-0 w-32 h-32 ${Config.color} opacity-0 group-hover:opacity-[0.03] rounded-bl-full translate-x-1/2 -translate-y-1/2 transition-all duration-500`} />
                  </motion.div>
               )
             })}
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section id="dicas" className="py-32 bg-zinc-50 overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                 <div className="w-16 h-1 w-16 bg-emerald-600 rounded-full" />
                 <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.9]">
                   Informação que <span className="text-emerald-600 italic">regenera</span> o ecossistema.
                 </h2>
                 <p className="text-zinc-500 text-lg leading-relaxed">
                   Sabia que a contaminação de materiais recicláveis com resíduos orgânicos 
                   pode invalidar todo um lote de reciclagem? No ECO Ponto, nosso propósito é 
                   elevar o nível de consciência sobre o ciclo de vida dos produtos.
                 </p>
                 
                 <div className="space-y-4">
                    {[
                      { title: "Limpeza é fundamental", desc: "Sempre enxágue embalagens de alimentos para evitar contaminação." },
                      { title: "Separação na fonte", desc: "Mantenha o lixo seco separado do úmido desde o primeiro momento." },
                      { title: "Logística reversa", desc: "Medicamentos e pneus devem voltar para onde foram comprados." }
                    ].map((tip, i) => (
                      <Card key={i} className="border-none shadow-sm bg-white rounded-2xl p-4 overflow-hidden relative">
                        <div className="flex items-start gap-4">
                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">{i+1}</div>
                           <div>
                              <h4 className="font-bold text-zinc-900">{tip.title}</h4>
                              <p className="text-sm text-zinc-500">{tip.desc}</p>
                           </div>
                        </div>
                      </Card>
                    ))}
                 </div>
              </div>
              
              <div className="order-1 lg:order-2 bg-emerald-600 rounded-[60px] p-12 md:p-20 relative overflow-hidden text-white shadow-2xl">
                 <div className="relative z-10 space-y-6">
                    <Leaf className="w-16 h-16 opacity-30" />
                    <h3 className="text-4xl font-display font-bold leading-tight">Mapeando o impacto através do descarte.</h3>
                    <p className="text-emerald-50 leading-relaxed text-lg">
                      Ao informar as pessoas sobre o descarte correto, evitamos que toneladas 
                      de resíduos cheguem aos nossos oceanos e rios.
                    </p>
                    <div className="pt-8 grid grid-cols-2 gap-8">
                       <div>
                         <p className="text-4xl font-display font-bold">1kg</p>
                         <p className="text-xs uppercase tracking-widest opacity-60">Papel = 540L água</p>
                       </div>
                       <div>
                         <p className="text-4xl font-display font-bold">100%</p>
                         <p className="text-xs uppercase tracking-widest opacity-60">Vidro Reciclável</p>
                       </div>
                    </div>
                 </div>
                 {/* Decorative circles */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl translate-x-1/4 translate-y-1/4" />
              </div>
           </div>
        </div>
      </section>

      {/* Brand CTA */}
      <section id="sobre" className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-linear-to-br from-zinc-900 to-zinc-800 rounded-[30px] md:rounded-[50px] min-h-[400px] md:h-[500px] flex items-center justify-center p-6 md:p-20 text-center text-white space-y-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6 md:space-y-8">
               <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white border-none py-1.5 px-4 font-bold tracking-widest uppercase text-[10px]">EcoPonto Idea</Badge>
               <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">Transforme Ideias em Ações.</h2>
               <p className="text-xl text-zinc-400 leading-relaxed">
                 Inspirado no projeto da <strong>Ascender Ideias</strong>, o ECO Ponto é um portal dedicado 
                 a democratizar o acesso à educação ambiental de qualidade para todos os brasileiros.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                 <a href="https://www.ecomaps.ascenderideias.com.br" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                   <Button className="h-16 px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg w-full shadow-xl shadow-emerald-500/20">Acesse o App</Button>
                 </a>
               </div>
            </div>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
          </div>
        </div>
      </section>

      {/* Final Footer */}
      <footer className="py-20 bg-zinc-950 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-20 border-b border-zinc-800">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-2">
                <Leaf className="w-8 h-8 text-emerald-500" />
                <span className="font-display font-bold text-2xl tracking-tighter uppercase">ECO Ponto</span>
              </div>
              <p className="text-zinc-500 leading-relaxed max-w-sm text-lg">
                Educação ambiental prática para um cotidiano mais sustentável. 
                Sua bússola informativa para o descarte ecológico.
              </p>
            </div>
            
            <div className="space-y-6">
              <h5 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">Explore</h5>
              <ul className="space-y-4 text-zinc-500 font-medium">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Voltar ao Topo</button></li>
                <li><a href="#categorias" className="hover:text-white transition-colors">Categorias</a></li>
                <li><a href="#dicas" className="hover:text-white transition-colors">Dicas de Descarte</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">Conecte-se</h5>
              <ul className="space-y-4 text-zinc-500 font-medium">
                <li><a href="https://www.instagram.com/ascenderideias/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="https://www.linkedin.com/company/ascenderideias/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="https://www.ascenderideias.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ascender Ideias</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 gap-8 text-zinc-700 text-[10px] font-bold uppercase tracking-[0.3em]">
            <p>© 2024 ECO Ponto Brasil. Conhecimento para a vida.</p>
            <div className="flex gap-12">
               <span>Paz & Reciclagem</span>
               <span>Brasil</span>
            </div>
          </div>

          <div className="mt-16 text-center border-t border-zinc-900 pt-8">
            <p className="text-white text-sm font-bold uppercase tracking-[0.4em]">
              Mais um projeto Ascender Ideias
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


