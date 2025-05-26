import prisma from "../../prisma/context.js";

const getUser = async () => {
    try {

        const users = await prisma.users.findMany({
            where: {
                deleted: false,
            }        
        });
        return users;
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
}

const getUserById = async (id) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id), // convertir el id a entero
            },
        });
        return user;
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
}

const updateUserById = async (id, data) => {
    try {
        const user = await prisma.users.update({
            where: {
                id: parseInt(id), // convertir el id a entero
            },
            data: data,
        });
        return user;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
}

const createdUser = async (data) => {
    try {
        const {name, email, password,role} = data;

        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: password,
                role: role,
            }
        });
        return user;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
}

const deleteUserById = async (id) => {
    try {
        const user = await prisma.users.update({
            where: {
                id: parseInt(id), // convertir el id a entero
            },
            data: {
                deleted: true,
            },
        });
        return user;
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
}

export {
    getUser,
    getUserById,
    updateUserById,
    createdUser,
    deleteUserById
}