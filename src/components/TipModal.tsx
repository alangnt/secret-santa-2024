'use client'

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const tips = [
  "💡 Astuce de Pro : Le Comic Sans est la seule police professionnelle dont vous aurez besoin.",
  "🎨 Règle de design : Plus il y a de dégradés, plus c'est professionnel. Utilisez TOUTES les couleurs !",
  "📏 Toujours tout centrer. Si ce n’est pas centré, recentrez-le encore.",
  "🌈 Texte noir sur fond gris foncé, c’est le summum de la lisibilité.",
  "✨ Les balises blink reviennent à la mode – faites-nous confiance !",
  "🎯 Si votre logo fait pas de rotation, est-ce que vous faites vraiment un effort ?",
  "📱 Le responsive mobile est surcoté. Les vrais utilisateurs ont des écrans 4K.",
  "🔍 Plus le texte est petit, plus c’est sophistiqué.",
  "🎪 Une musique de cirque en autoplay montre à vos utilisateurs que vous tenez à leur engagement",
  "🌟 Les balises marquee sont l’avenir de l’animation web.",
  "🖌️ Ajouter un maximum d'ombres sous vos textes. Plus c’est flou, plus c’est pro.",
  "🖼️ Les GIFs scintillants en arrière-plan : toujours une bonne idée.",
  "🛠️ Un site en maintenance perpétuelle montre que vous travaillez dur.",
  "🔥 Le rouge vif comme couleur principale attire immédiatement l’attention (et les yeux qui brûlent).",
  "🚨 N’hésitez pas à mettre une alerte sonore à chaque clic. Ça capte l’attention de vos utilisateurs !",
  "💾 Ajoutez une animation de sauvegarde des années 90 pour rappeler la nostalgie.",
  "🕹️ Un mini-jeu obligatoire avant d’accéder au contenu principal ? Ça, c’est du design immersif.",
  "📣 Des pop-ups clignotants sur chaque page, parce qu’il faut bien informer l’utilisateur !",
  "🎆 Des feux d’artifice en CSS pour chaque clic sur un bouton : c’est ça, la magie du web.",
  "📢 Mettez votre titre en majuscules ET en italique, pour une autorité maximale."
];

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TipModal({ isOpen, onClose }: TipModalProps) {
  const [randomTip, setRandomTip] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const tip = tips[Math.floor(Math.random() * tips.length)];
      setRandomTip(tip);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-purple-600 text-center">Le Petit Tip du Jour</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-lg mb-6 text-center">{randomTip}</p>
        <button
          onClick={onClose}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        >
          J&apos;ai compris! (Mais est-ce une bonne chose?)
        </button>
      </div>
    </div>
  );
}