//A biblioteca session cria uma sessão ao fazer login
//token de autenticação: coloca o usuário e a senha no login; o servidor recebe isso e um segredo e cria um token que é devolvido ao usuário
//para acessar páginas que exigem estar logado, deve-se enviar as credenciais e o token
//JOSE é uma biblioteca que faz a assinatura e cria o token 
//O token é como um ingresso de cinema; ele permite acessar páginas que exigem login

'use server'; //está do lado do servidor

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

async function abrirToken(token: string){
    //no arquivo oculto .env, foi criada uma chave TOKEN com um valor aleatório
    
    const chaveCodificada = new TextEncoder().encode(process.env.TOKEN); 
    //a biblioteca jose verifica se existe um token válido e extrai o payload (carga util) dele
    try{
        const {payload} = await jwtVerify(token, chaveCodificada, {
            algorithms: ["HS256"],
        });
        return payload;
    }
    catch(e){
        console.log('Erro ao verificar session token', e);
    }

}

//essa função recebe um ID e um email e cria o token quando o usuário faz login
export async function criarToken(usuarioID: string, usuarioEmail: string){
    const chaveCodificada = new TextEncoder().encode(process.env.TOKEN); //guarda a chave do token em chaveCodificada
    const tempoLimite = Date.now() + 3600; //o token expira em uma hora a partir de sua criação

    //cria a session, criptografa o ID, o email e o segredo e assina o token
    const session = await new SignJWT({usuarioID, usuarioEmail}).setProtectedHeader({
        alg: 'HS256' //especifica o algoritmo de criptografia como HS256
    })
    .setExpirationTime('1h')
    .sign(chaveCodificada); //assina o token

    //como a função criarToken é async, precisamos criar a listaDeCookies
    const listaDeCookies = await cookies();

    //por meio da listaDeCookies, conseguimos buscar (get) e salvar (set) cookies no navegador
    listaDeCookies.set('session', session, {
        expires: tempoLimite * 1000,
        path: '/',
        httpOnly: true
    });

    //salva o token chamado session no cookie
    //httpOnly analisa do lado do servidor; fica mais seguro para usar o cookie

}

//função que verifica se o usuário está logado
export async function validarSessao(){
    const sessionCookie = (await cookies()).get('session'); //pega o token da fábrica de cookies
    if (sessionCookie){
        const {value} = sessionCookie; //extrai o valor do token
        const session = await abrirToken(value); //verfica o valor que tirei do token, se o segredo está dentro dele
        return session;
    }

    return false;
}

//função que deleta a sessão; desloga o usuário
export async function deletarSessao() {
    //como essa função é async, precisamos criar primeiro a listaDeCookies
    const listaDeCookies = await cookies();
    listaDeCookies.delete('session');
    //deleta da lista de cookies o cookie que possui um token chamado session
}