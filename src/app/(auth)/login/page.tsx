'use client'; //está do lado do cliente para usar o toast

import '@/app/styles/login.css';
//@ já busca a raiz do projeto, atalho
import {z} from 'zod';
import {toast} from 'react-hot-toast';
import {validarCredenciais} from "@/app/libs/credentials";
import Link from 'next/link';

//credenciais de login
export interface credenciais {
    email: string,
    senha: string
}

//valida se email e senha foram preenchidos corretamente
const formatacaoLogin = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    senha: z.string({message: 'Insira uma senha'}).trim().min(4, {message: 'Senha precisa no mínimo 4 caracteres'}),
});

export default function Login() {

    const verificarLogin = async (dadosForm: FormData) => {
        //extraindo dados do formulário
        const dadosLogin: credenciais = {
            email: dadosForm.get('email') as string,
            senha: dadosForm.get('senha') as string
        }

        //validando o formulário com o zod
        const resultado = formatacaoLogin.safeParse(dadosLogin);
        if(!resultado.success){//se o que está escrito no formulário for inválido
            //constrói mensagem de erro
            let msgErro = '';
            resultado.error.issues.forEach((i) => {
                msgErro = msgErro + i.message + '.\n';
            });

            toast.error(msgErro); //imprime a mensagem de erro
            return;
        }

        //verifica se o usuário é legítimo (comparando os dados com a base de dados) e cria um session token
        const validacaoLogin = await validarCredenciais(dadosLogin);
        if(validacaoLogin) {
            toast.error(validacaoLogin.error); //a senha está errada, ou o usuário não existe
            return;
        }

        //O servidor pega o email e a senha, valida e criptografa a senha; pega o segredo, assina e junta os três e devolve um token.
        //O session token volta para o usuário por meio dos cookies do navegador (O arquivo middleware verifica se tem token o tempo todo)
    }

    return(
       

                <form action={verificarLogin}>
                    <input type="email" placeholder="E-mail" name='email' id='email' aria-label='email'/>
                    <input type="password" placeholder="Senha" name='senha' id='senha' aria-label='senha'/>

                    <button type="submit" className="btn_continuar">Continuar</button>

                    
                       <Link href='/cadastro'>Criar conta</Link> 
                  
                </form>
    
    );
}