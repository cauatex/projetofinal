'use client'; //está do lado do cliente para usar o toast

import '@/app/styles/cadastro.css';

import {redirect} from 'next/navigation';
import {email, z} from 'zod';
import toast from 'react-hot-toast';
import { criarUsuario } from '@/app/libs/credentials';
import { credenciais } from '../login/page';

//cria as regras para validar o cadastro
const formatacaoCadastro = z.object({

    //valida email e senha
    email: z.string().trim().email('Email com formato incorreto'),
    senha: z.string({message: 'Insira uma senha'}).trim().min(4, {message: 'Senha precisa no mínimo 4 caracteres'}),
    confirmaSenha: z.string({message: 'Insira uma confirmação de senha'}).trim().min(4, {message: 'Confirmar senha precisa no mínimo 4 caracteres'}),

}).refine((dados) => dados.senha === dados.confirmaSenha, {
    message: 'Senhas não conferem',

    path: ["confirmaSenha"] //verifica se a senha é igual à confirmaSenha
});

export default function CadastrarUsuario(){

    const criarUsuarioCliente = async (dados: FormData) => {

        //extraindo os dados do formulário
        const usuario = {
            email: dados.get('email') as string,
            senha: dados.get('senha') as string,
            confirmaSenha: dados.get('confirmaSenha') as string
        }

        const resultado = formatacaoCadastro.safeParse(usuario); //verifica se os dados estão no formato correto
        
        //cria a mensagem de erro
        if(!resultado.success){
            let msgErro = '';
            resultado.error.issues.forEach((i) => {
                msgErro = msgErro + i.message + '.\n';
            })

            //imprime a mensagem de erro
            toast.error(msgErro);
            return;
        }

        //coloca o usuário na base de dados
        const retorno = await criarUsuario(usuario as credenciais); //cria um objeto usuário do tipo credenciais

        if(retorno.error){ //se não conseguir criar o usuário, imprime a mensagem de erro
            toast.error(retorno.error);
            return;
        }
        else if(retorno.success){ //se o usuário foi criado com sucesso, imprime a mensagem de sucesso e redireciona para a página de login
            toast.success(retorno.success);
            redirect('/login'); 
        }
    }

    //o atributo name do input guarda o dado digitado e envia para o servidor
    return(
        <>
            <div className="background-overlay"></div>

            <div className="cadastro-container">
                <h2>Cadastre-se</h2>
                <p className="subtitle">Digite seu e-mail e senha para continuar</p>

                <form action={criarUsuarioCliente}>
                    <input type="email" placeholder="E-mail" name='email' id='email' aria-label='email'/>
                    <input type="password" placeholder="Senha" name='senha' id='senha' aria-label='senha' />
                    <input type="password" placeholder="Confirmar Senha" name='confirmaSenha' id='confirmaSenha' aria-label='confirmaSenha'/>

                    <button type="submit" className="btn_cadastrar">Cadastrar</button>
                </form>
            </div>

        </>
    );
}