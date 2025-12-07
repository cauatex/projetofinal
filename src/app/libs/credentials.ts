'use server'; //está do lado do servidor

import {credenciais} from "../(auth)/login/page"; //importar o tipo credenciais
import bcrypt from 'bcrypt'; //biblioteca para criptografia de senhas
import conexaoBD from './conexao-bd'; //estabelece conexão com a base de dados
import {criarToken} from './session'; //cria o token
import {redirect} from "next/navigation"; //redireciona para outra página
import { success } from "zod";

export async function criarUsuario(dados: credenciais){ //função que cria um novo usuário
    //dados é um objeto que contém email e senha

    const email = dados.email;
    const senha = dados.senha;
    const senhaCriptografada = await bcrypt.hash(senha,10); //criptografou a senha usando o bcrypt com 10 caracteres
    
    //cria o novo usuário
    const novoUsuario = {
        id: crypto.randomUUID(), //cria um ID único criptografado aleatório
        email,
        senha: senhaCriptografada
    }

    const usuarios = await conexaoBD.retornarBD('usuarios-db.json');
    
    //verifica se o usuário já existe na base de dados
    for(const usuario of usuarios){
        if(usuario.email === email){
            return {error: 'Usuário ou senha incorreto'}; //o usuário já existe
        }
    }

    usuarios.push(novoUsuario); //coloca na lista usuarios o novo usuario

    await conexaoBD.armazenarBD('usuarios-db.json', usuarios); //sobrescreve a base de dados com o conteúdo atualizado da lista

    return {success: 'Usuário criado com sucesso'};
}

export async function validarCredenciais(dados: credenciais){ //função de validação para o login
    const email = dados.email; //extração dos dados enviados do login
    const senha = dados.senha;

    const usuariosDB = await conexaoBD.retornarBD('usuarios-db.json'); //vetor que guarda o conteúdo da base de dados (cada usuário é um objeto com id, email e senha)

    const usuario = usuariosDB.find(i => i.email === email); //encontra o objeto que tem o email correspondente. O objeto usuario possui email, senha e id
    
    if(!usuario){ //não achou o usuário no bd
        return {error: 'Usuário não encontrado'};
    }

    const verificado = await bcrypt.compare(senha, usuario.senha as string); //compara a senha do forms com a senha criptografada do bd; as string parece ser desnecessário

    if(verificado){ //senha correta
        //cria um token para o usuário verificado e o redireciona para a página principal
        await criarToken(usuario.id, usuario.email); 
        redirect('/principal'); 
    }
    else{
        return {error:'Usuário ou senha incorreto'}; //senha incorreta
    }
}