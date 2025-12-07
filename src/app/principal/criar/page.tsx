import conexaoBD from "@/app/libs/conexao-bd";

import { FilmeProps } from "@/app/ui/filme-card";

import { redirect } from "next/navigation";

const arquivo = 'filmes-db.json';

export default function CriarFilme(){

    const adicionarFilme = async (dados: FormData) => {
        'use server' //vai carregar o HTML pro lado do servidor

        //criar uma nova instância de FilmeProps para ser adicionada à base de dados
        const novoFilme: FilmeProps = { //todos esse dados vêm do atributo name dos inputs
            id: crypto.randomUUID(),
            nome: dados.get('nome') as string,
            descricao: dados.get('descricao') as string,
            img: dados.get('img') as string
        }

        //acessa a base de dados para adicionar o novo Filme na lista
        const listaFilmes = await conexaoBD.retornarBD(arquivo);

        listaFilmes.push(novoFilme);

        await conexaoBD.armazenarBD(arquivo, listaFilmes);

        redirect('/principal');
    }


    return(
        <section>
            <h2>Inserir Novo Filme</h2>

            <form action={adicionarFilme}>

                <section>
                    <input type="text" name="nome" id="nome" placeholder="Nome do Filme" aria-label="Nome do Filme"/>
                </section>

                <section>
                    <input type="text" name="descricao" id="descricao" placeholder="Descrição do Filme" aria-label="Descrição do Filme"/>
                </section>

                   <section>
                    <input type="text" name="img" id="img" placeholder="Link com a imagem do Filme" aria-label="Link com a imagem do Filme"/>
                </section>

                <button>Adicionar</button>
            </form>
        </section>
    )
}