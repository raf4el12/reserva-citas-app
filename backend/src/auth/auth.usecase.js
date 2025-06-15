import bcrypt from "bcrypt";
import prisma from "../../prisma/context.js";
import jwt from "jsonwebtoken";

// guardarmos la clave secrete tipo variable de entorno

const SECRET_KEY = process.env.JWT_SECRET || 'some_secret_key';

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

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role
        },
        SECRET_KEY, 
        {
            expiresIn: '10m', // le damos un tiempo de expiracion al token de 10minutos 
        }
    )

    
    return {
        userId: user.id,
        email: user.email,
        token
    }
}

export {
    login,
}