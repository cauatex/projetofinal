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
    email: z.string().trim().email('Email com formato incorreto'), //zod espera uma string em formato de email
    senha: z.string({message: 'Insira uma senha'}).trim().min(4, {message: 'Senha precisa no mínimo 4 caracteres'}), //zod espera uma string com 4 caracteres
});

export default function Login() {

    const verificarLogin = async (dadosForm: FormData) => {
        //extraindo dados do formulário, utilizando o atributo 'name' do input para defini-los
        const dadosLogin: credenciais = {
            email: dadosForm.get('email') as string,
            senha: dadosForm.get('senha') as string
        }

        //validando o formulário com o zod
        const resultado = formatacaoLogin.safeParse(dadosLogin); 
        if(!resultado.success){//se o que está escrito no formulário for inválido
            //constrói mensagem de erro
            let msgErro = '';
            resultado.error.issues.forEach((i) => { //.issues é um vetor com os erros encontrados
                msgErro = msgErro + i.message + '.\n'; //.message é o atributo de mensagem desses erros
            });

            toast.error(msgErro); //imprime a mensagem de erro
            return;
        }

        //Se os campos foram preenchidos corretamente
        //verifica se o usuário é legítimo (comparando os dados com a base de dados) e cria um session token
        const validacaoLogin = await validarCredenciais(dadosLogin); //função retorna uma mensagem de erro ou redireciona o usuário para a página principal
        if(validacaoLogin) {
            toast.error(validacaoLogin.error); //a senha está errada, ou o usuário não existe
            return;
        }

        //O servidor pega o email e a senha, valida e criptografa a senha; pega o segredo, assina e junta os três e devolve um token.
        //O session token volta para o usuário por meio dos cookies do navegador (O arquivo middleware verifica se tem token o tempo todo)
    }

    return(
        //O formulário dispara a função verificarLogin, passando os dados inseridos nos inputs pelo usuário (email e senha)
        <>
            <h1>Faça seu login ou crie uma conta</h1>
                <form action={verificarLogin} className='formLogin'> 
                    <input type="email" placeholder="E-mail" name='email' id='email' aria-label='email'/>
                    <input type="password" placeholder="Senha" name='senha' id='senha' aria-label='senha'/>

                    <button type="submit">Continuar</button>

                    
                       <Link href='/cadastro'><button>Criar conta</button></Link> 
                  
                </form>
        </>
    );
}