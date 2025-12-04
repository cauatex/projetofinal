'use client';

import '@/app/styles/login.css';
//@ já busca a raiz do projeto, atalho


export default function Login() {

    return(
        <>
            <div className="background-overlay"></div>

            <div className="login-container">
                <h2>Faça login ou crie sua conta</h2>
                <p className="subtitle">Digite seu e-mail e senha para continuar</p>

                <form>
                    <input type="email" placeholder="E-mail" required/>
                    <input type="password" placeholder="Senha" required/>

                    <button type="submit" className="btn_continuar">Continuar</button>

                    <button type="button" className="btn_criar_conta">
                        Criar conta
                    </button>
                </form>
            </div>
        </>
    );
}