import { deletarSessao } from '../libs/session';
import { redirect } from 'next/navigation';

export default function botaoLogout(){
    
    const logout = async () => {
        'use server'

        await deletarSessao();

        redirect('/login');
    }

    return(
        <form action={logout}>
            <button>Logout</button>
        </form>
    )
}