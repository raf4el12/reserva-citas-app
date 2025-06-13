import bcrypt from "bcrypt";
import prisma from "../../prisma/context.js";

const login = async (email, password) => {
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    })

    const messageError = 'Credenciales no validas'
    if (!user)
        throw new Error(messageError);

    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
        throw new Error(messageError);
        
    // crear token

    return {
        userId: user.id,
        email: user.email,
    }
}

export {
    login
}