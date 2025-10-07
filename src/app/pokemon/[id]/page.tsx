import { notFound } from 'next/navigation';
import PokemonDetail from '../../../components/pokemon/PokemonDetail';

interface PokemonPageProps {
  params: {
    id: string;
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { id } = await params;
  
  // Validar que el ID sea un número válido
  if (!id || isNaN(Number(id)) || Number(id) < 1) {
    notFound();
  }

  return <PokemonDetail pokemonId={id} />;
}
