

export interface IUserInfo{
    userEmail: string
}

export default function UserInfo(userInfo: IUserInfo){

    const regex = /@.*/i; //procura o @ e qualquer coisa pra frente dele

    const name = userInfo.userEmail.replace(regex,""); //no email do usuário, troca o que vem do @ para frente por "", vazio

    return(
        <p>Olá {name}</p>
    )
}