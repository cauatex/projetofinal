import '@/app/styles/adicionar.css'

import conexaoBD from "@/app/libs/conexao-bd";

import { FilmeProps } from "@/app/ui/filme-card";

import { redirect } from "next/navigation";

interface EditarFilmeProps{
    params: Promise<{id: string}>; //Promise passa o id de forma assincrona
}

export default async function EditarFilme({params}: EditarFilmeProps){
    
    const {id} = await params; //params guarda um id dentro dele, então eu declaro como {id}

    //Abrir o arquivo e pegar os dados do Filme
    const listaFilmes = await conexaoBD.retornarBD('filmes-db.json');

    const filmeToEdit: FilmeProps = listaFilmes.find((f: FilmeProps) => f.id === id);
    //para cada objeto Filme, procura aquele que o id bate com o id recebido

    const filmeToEditIndice: number = listaFilmes.findIndex((f) => f.id === id);
    //pega o indice do filme que estou editando

    const atualizarFilme = async (dados: FormData) => {
        'use server'; //para acessar a base de dados a função tem que ser do lado do servidor

        //construir o filme:
        const novoFilme: FilmeProps = {
            id,
            nome: dados.get('nome') as string,
            descricao: dados.get('descricao') as string,
            img: dados.get('img') as string
        }

        listaFilmes.splice(filmeToEditIndice, 1, novoFilme); //atualiza o valor do indice

        await conexaoBD.armazenarBD('filmes-db.json', listaFilmes);

        redirect('/principal');
    }

    return(
        <section className='pag'>
            <h2 className='msg'>Editar {filmeToEdit.nome}</h2>

            <form className='form-criar' action={atualizarFilme}>
                <section>
                    <input className='entrada' type="text" name="nome" id="nome" placeholder="Nome do Filme" aria-label="Nome do Filme" defaultValue={filmeToEdit.nome} />
                </section>

                <section>
                    <input className='entrada' type="text" name="descricao" id="descricao" placeholder="Descrição do Filme" aria-label="Descrição do Filme" defaultValue={filmeToEdit.descricao} />
                </section>

                <section>
                    <input className='entrada' type="text" name="img" id="img" placeholder="Link com a imagem do Filme" aria-label="Link com a imagem do Filme" defaultValue={filmeToEdit.img}/>
                </section>

                <div className='btns'>
                    <button className='botao-adicionar'>Atualizar</button>
                </div>
                
            </form>
        </section>
    )
}