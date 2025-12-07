

export interface IUserInfo{
    userEmail: string
}

export default function UserInfo(userInfo: IUserInfo){

    const regex = /@.*/i; //procura o @ e qualquer coisa pra frente dele

    const name = userInfo.userEmail.replace(regex,""); //tira do email o conteúdo da variável regex

    return(
        <p>Olá {name}</p>
    )
}