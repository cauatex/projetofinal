"use client"; //o código vai ser carregado do lado do cliente pra chamar a API e usar estados

import { useState } from "react";  
//import para usar estado dentro de um componente react

import axios from "axios";
//biblioteca Axios, usada para fazer requisições HTTP (GET, POST).
//no código, é usada para buscar dados da API OMDb

import { useRouter } from "next/navigation"; //para redirecionar do lado do cliente

import { salvarFilmeNoBD } from "@/app/actions/salvar-filmes"; 

import '@/app/styles/barra_pesquisa.css';


//definição dos tipos do objeto Filme
interface Filme {
  nome: string;
  descricao: string;
  imgSrc: string;
}

export default function SearchCard() {
  //estado que guarda o texto digitado no input
  const [nome, setNome] = useState<string>(""); //por padrão é vazio
  
  //flag que controla se o CharacterCard deve ser mostrado (para decidir se mostra algo ou nada)
  const [active, setActive] = useState<boolean>(false);
  
  //controla se o resultado foi Sucesso ou Erro
  const [encontrou, setEncontrou] = useState<boolean>(false); 

  //Objeto que guarda os dados do filme que serão passados para o CharacterCard.tsx
  const [filme, setFilme] = useState<Filme>({
    nome: "",
    descricao: "",
    imgSrc: "",
  });

  const router = useRouter(); //para redirecionar para outra página pelo lado do cliente

  //chave de acesso para usar a API
  const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;


  //essa função recebe o evento do input e atualiza o valor de 'nome'
  //como o typescript precisa de tipagem: 'e' é um evento de troca 
  // (ChangeEvent) e veio de um <input> especificamente”
  const tratarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value); 
    //vai mudar o estado/valor da variável nome para o valor digitado no input
  };

  //essa função é chamada ao clicar no botão
  //.trim() remove espaços no começo e no final da string nome; 
  //se o valor do nome for vazio, não pesquisa e sai da função.
  const buscaFilmeOMDb = async () => {
    if (!nome.trim()) 
      return;

    //Monta a URL da API
    //encodeURIComponent converte caracteres especiais (espaços, acentos, &, ?) do nome em formato seguro de URL.
    //a API do OMDb permite escolher o tamanho da descrição do filme {plot=short/full}
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(nome)}&plot=short`;

    try {
      //espera a resposta da OMDb
      const resposta = await axios.get(url);
      
      const filmeData = resposta.data; //resposta.data guarda o JSON retornado pela API.

      //verifica se achou o filme e se ele tem foto e descrição
      if (
        filmeData.Response === "False" ||  //O OMDb retorna { Response: "False"} quando não acha o filme
        filmeData.Poster === "N/A" ||     // Filme sem foto
        filmeData.Plot === "N/A"          // Filme sem descrição
      ) {
        setActive(true);      // Ativa a visualização
        setEncontrou(false);  // Marca como NÃO encontrado (vai mostrar msg de erro)
        return;               // PARA A EXECUÇÃO; Não cria objeto 'novoFilme' nem salva.
      }

      //se passou pela verificação, o filme é válido e completo, cria o objeto novoFilme
      const novoFilme = {
        nome: filmeData.Title,
        descricao: filmeData.Plot,
        imgSrc: filmeData.Poster,
      };

      //atualiza os estados para mostrar o Card
      setFilme(novoFilme);
      setEncontrou(true);
      setActive(true);

      //espera salvar no banco
      await salvarFilmeNoBD(novoFilme);
      
      //redireciona para página principal através do lado do cliente 
      router.push('/principal'); 

    } catch (e) {
      console.error(e); //para debugar
      setActive(true); 
      setEncontrou(false);
    }
  };

  return (
    <>
    <section className="corpo">
      <section className="search">
        <input 
          className="pes" 
          type="text" 
          onChange={tratarInput} 
          placeholder="Digite o nome do filme"
        />
        <button className="btn" onClick={buscaFilmeOMDb}>Buscar</button>
      </section>
 
      {/*buscou e NÃO achou, imprime msg de erro*/}
      {active && !encontrou && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2 style={{ color: "black", marginBottom: "10px" }}>NÃO! O filme não existe!</h2>
        </div>
      )}

    </section>
    </>
  );
}