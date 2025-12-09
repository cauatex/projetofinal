"use client"; 

import { useState } from "react"; 
import axios from "axios";
import { useRouter } from "next/navigation"; 
import CharacterCard from "./CharacterCard";
import { salvarFilmeNoBD } from "@/app/actions/salvar-filmes"; 


interface Filme {
  nome: string;
  descricao: string;
  imgSrc: string;
}

export default function SearchCard() {
  const [nome, setNome] = useState<string>(""); 
  
  // Controla se a busca já foi feita (para decidir se mostra algo ou nada)
  const [active, setActive] = useState<boolean>(false);
  
  // Controla se o resultado foi Sucesso ou Erro
  const [encontrou, setEncontrou] = useState<boolean>(false); 

  const [filme, setFilme] = useState<Filme>({
    nome: "",
    descricao: "",
    imgSrc: "",
  });

  const router = useRouter(); 
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  const tratarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value); 
  };

  const buscaFilmeOMDb = async () => {
    if (!nome.trim()) return;

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(nome)}&plot=short`;

    try {
      const resposta = await axios.get(url);
      
      const filmeData = resposta.data;

      // --- CORREÇÃO: VERIFICA SE O POSTER OU O PLOT (DESCRIÇÃO) ESTÃO FALTANDO ---
      if (
        filmeData.Response === "False" || // Erro claro da API
        filmeData.Poster === "N/A" ||     // Filme sem poster
        filmeData.Plot === "N/A"          // Filme sem descrição
      ) {
        setActive(true);      // Ativa a visualização
        setEncontrou(false);  // Marca como NÃO encontrado (vai mostrar o Luke)
        return;               // PARA A EXECUÇÃO! Não cria objeto 'novoFilme' nem salva.
      }

      // Se passou pela verificação, o filme é válido e completo:
      const novoFilme = {
        nome: filmeData.Title,
        descricao: filmeData.Plot,
        imgSrc: filmeData.Poster,
      };

      // Atualiza os estados para mostrar o Card
      setFilme(novoFilme);
      setEncontrou(true);
      setActive(true);

      // Salva no Banco de Dados
      await salvarFilmeNoBD(novoFilme); 
      
      // Atualiza a lista na tela
      router.refresh(); 

    } catch (e) {
      // Se der erro de rede/axios, tratamos como não encontrado também
      setActive(true);
      setEncontrou(false);
    }
  };

  return (
    <>
      <section className="search">
        <input 
          className="pes" 
          type="text" 
          onChange={tratarInput} 
          placeholder="Digite o nome do filme"
        />
        <button className="btn" onClick={buscaFilmeOMDb}>Buscar</button>
      </section>

     
      
      {/* Caso 1: Buscou e achou -> Mostra o Card */}
      {active && encontrou && (
        <CharacterCard 
          nome={filme.nome} 
          descricao={filme.descricao} 
          imgSrc={filme.imgSrc}
        />
      )}

      {/* Caso 2: Buscou e NÃO achou -> Mostra o Luke */}
      {active && !encontrou && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2 style={{ color: "white", marginBottom: "10px" }}>NÃO! O filme não existe!</h2>
        </div>
      )}

    </>
  );
}




