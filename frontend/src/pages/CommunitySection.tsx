import { CommunityHome } from '@/comunidad/CommunityHome';
import { RootsSection } from '@/comunidad/RootsSection';
import { VibrantPresentSection } from '@/comunidad/VibrantPresentSection';
import { CooperativaSection } from '@/comunidad/CooperativaSection';
import { VocesDeNuestraTierra } from '@/comunidad/VocesDeNuestraTierra';

export function CommunitySection() {
  return (
    <>
      <CommunityHome />

      <RootsSection />
      {/* Servicios y productos de la cooperativa */}
      <VibrantPresentSection />
      <CooperativaSection />
      <VocesDeNuestraTierra />
    </>
  );
}
