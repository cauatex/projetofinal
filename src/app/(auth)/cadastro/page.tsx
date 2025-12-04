'use client';

import '@/app/styles/cadastro.css';

export default function CadastrarUsuario(){

    return(
        <>
            <div className="background-overlay"></div>

            <div className="cadastro-container">
                <h2>Cadastre-se</h2>
                <p className="subtitle">Digite seu e-mail e senha para continuar</p>

                <form>
                    <input type="email" placeholder="E-mail" required />
                    <input type="password" placeholder="Senha" required />
                    <input type="password" placeholder="Confirmar Senha" required />

                    <button type="submit" className="btn_cadastrar">Cadastrar</button>
                </form>
            </div>

        </>
    );
}