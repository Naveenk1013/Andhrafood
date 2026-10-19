'use client';

import React from 'react';
import MagicBento, { MagicBentoItem } from '@/components/ui/MagicBento';
import { Flame, Soup, Wheat, Fish, Sparkles, UtensilsCrossed } from 'lucide-react';

interface TastePhilosophyBentoProps {
  locale: string;
}

export const TastePhilosophyBento: React.FC<TastePhilosophyBentoProps> = ({ locale }) => {
  const isTe = locale === 'te';

  const items: MagicBentoItem[] = [
    {
      id: 'guntur-karam',
      title: isTe ? 'గుంటూరు కారం · The Fiery Karam' : 'The Fiery Guntur Karam',
      label: isTe ? '35,000 - 50,000 SHU · జిఐ ట్యాగ్' : '35,000 - 50,000 SHU · GI Tagged',
      description: isTe
        ? 'రాతిరోట్లో దంచిన గుంటూరు సన్నం మిరపకాయలు, వెల్లుల్లి, జీలకర్ర మిశ్రమం ఆంధ్ర వంటకాలకు రక్తాభ రంగును, నిరుపమాన ఘాటును అందిస్తాయి.'
        : 'Sun-dried Sannam chillies stone-pounded with roasted garlic and cumin, giving Andhra cuisine its unmistakable crimson fire and pungent aroma.',
      icon: <Flame className="w-4 h-4 text-guntur-400" />,
      visual: 'analytics',
      colSpan: 2,
      rowSpan: 2
    },
    {
      id: 'erra-gongura',
      title: isTe ? 'గోంగూర పులుపు · The Sacred Shakambhari' : 'The Sacred Gongura',
      label: isTe ? 'ఆంధ్ర శాకంభరి · సహజ ఆమ్లత్వం' : 'Andhra Shakambhari · Natural Acidity',
      description: isTe
        ? 'ఎర్ర గోంగూర ఆకులలోని సహజ ఆక్సాలిక్ ఆమ్లం మాంసాన్ని మృదువుగా చేస్తుంది, పప్పులకు తిరుగులేని పులుపును తెస్తుంది.'
        : 'Red-stemmed sorrel leaves packed with malic and oxalic acids that naturally tenderize rich meats and define our heirloom dals.',
      icon: <Soup className="w-4 h-4 text-leaf-400" />,
      colSpan: 1,
      rowSpan: 1
    },
    {
      id: 'ragi-sangati',
      title: isTe ? 'రాయలసీమ రాగి & మిల్లెట్స్' : 'Ancient Deccan Millets',
      label: isTe ? '344mg కాల్షియం / 100గ్రా · ఆవునెయ్యి' : '344mg Calcium / 100g · Bilona Ghee',
      description: isTe
        ? 'రాయలసీమ కర్షకుల ప్రాచీన ఆహారం — చేతితో మర్దించిన రాగి ముద్ద, స్వచ్ఛమైన ఆవునెయ్యి గుంటతో బలవర్ధకమైన శక్తినిస్తుంది.'
        : 'Dense finger millet mudda and sorghum rotis, the agrarian fuel of the Deccan plateau, drenched in golden Bilona cow ghee.',
      icon: <Wheat className="w-4 h-4 text-turmeric-400" />,
      visual: 'dashboard',
      colSpan: 1,
      rowSpan: 2
    },
    {
      id: 'chepala-pulusu',
      title: isTe ? 'గోదావరి చేపల పులుసు' : 'River Delta Seafood',
      label: isTe ? 'మట్టికుండ పులుసు · మరుసటి రోజు రుచి' : 'Clay-Pot Aging · Day-Two Flavor Peak',
      description: isTe
        ? 'మట్టిపాత్రలో పాత చింతపండు, పచ్చి మామిడికాయతో నెమ్మదిగా మగ్గే నదీ చేపలు. రాత్రంతా కుండలో నాని మరుసటి రోజు రుచి పరాకాష్టకు చేరుతుంది.'
        : 'River Pulasa and Korameenu simmered in unglazed earthen pots with aged tamarind and raw green mango, peaking in richness on day two.',
      icon: <Fish className="w-4 h-4 text-sky-400" />,
      colSpan: 1,
      rowSpan: 1
    },
    {
      id: 'avakaya-pickles',
      title: isTe ? 'ఆవకాయ & రాతిరోలు పచ్చళ్ళు' : 'Sun-Dried Avakaya & Pachallu',
      label: isTe ? 'జాడీ నిల్వ · సహజ ఆవపిండి ఘాటు' : 'Ceramic Bharanis · Zero Preservatives',
      description: isTe
        ? 'ముక్కలుగా తరిగిన పచ్చి మామిడి, నువ్వుల నూనె, ఆవపిండి, సముద్రపు ఉప్పుతో మట్టి జాడీలలో నెలల తరబడి పక్వానికి వచ్చే అమృతం.'
        : 'Raw mango cubes cured with sea salt, stone-ground mustard (aavapindi), and cold-pressed sesame oil, maturing in porcelain jars.',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      colSpan: 2,
      rowSpan: 1
    },
    {
      id: 'pootharekulu-sweets',
      title: isTe ? 'ఆత్రేయపురం పూతరేకులు & బెల్లం' : 'Artisanal Pootharekulu & Jaggery',
      label: isTe ? '400 ఏళ్ల సంప్రదాయం · బోర్లించిన కుండ' : '400-Yr Pot Baking · GI Tagged',
      description: isTe
        ? 'బోర్లించిన మట్టికుండపై తీసిన వరి రేకులు, స్వచ్ఛమైన ఆవునెయ్యి, అనకాపల్లి బెల్లం పొడితో నాలుకపై కరిగిపోయే మహోన్నత మిఠాయి.'
        : 'Micro-thin translucent rice-paper wafers folded with organic cane jaggery, cardamom, and pure ghee on inverted clay pots.',
      icon: <UtensilsCrossed className="w-4 h-4 text-turmeric-400" />,
      colSpan: 2,
      rowSpan: 1
    }
  ];

  const [isDark, setIsDark] = React.useState<boolean>(false);
  const [cols, setCols] = React.useState<number>(4);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const handleTheme = (e: Event) => {
      const custom = e as CustomEvent<string>;
      setIsDark(custom.detail === 'dark');
    };
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setCols(1);
        } else if (window.innerWidth < 1024) {
          setCols(2);
        } else {
          setCols(4);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('theme-change', handleTheme);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('theme-change', handleTheme);
    };
  }, []);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <MagicBento
        items={items}
        columns={cols}
        rowHeight={cols === 1 ? 260 : 210}
        gap={14}
        radius={18}
        theme={isDark ? 'dark' : 'light'}
        glowColor="#eeab23"
        enableBorderGlow={true}
        enableSpotlight={true}
        spotlightRadius={320}
        enableStars={true}
        particleCount={20}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        intro={true}
      />
    </div>
  );
};
