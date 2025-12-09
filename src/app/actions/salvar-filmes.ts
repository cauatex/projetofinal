'use server'

import ConexaoBD from "@/app/libs/conexao-bd";
import { FilmeProps } from "@/app/ui/filme-card";
import { revalidatePath } from "next/cache"; // IMPORTANTE

const arquivo = 'filmes-db.json';

interface FilmeData {
  nome: string;
  descricao: string;
  imgSrc: string;
}

export async function salvarFilmeNoBD(filme: FilmeData) {
  
  const novoFilme: FilmeProps = {
    id: crypto.randomUUID(),
    nome: filme.nome,
    descricao: filme.descricao,
    img: filme.imgSrc 
  };

  const listaFilmes = await ConexaoBD.retornarBD(arquivo);
  listaFilmes.push(novoFilme);
  await ConexaoBD.armazenarBD(arquivo, listaFilmes);

  // Avisa ao Next.js que a página /principal mudou e precisa ser recarregada
  // quando o usuário chegar lá.
  revalidatePath('/principal'); 
  
  // Retornamos true para avisar o front que deu certo
  return true; 
}