const {PrismaClient} = requiere ('@PrismaClient')
const prisma = new PrismaClient

const getAllRoles = async() => {
    return await prisma.rol.findMany()
}

const getRoleById = async (id) => {
    return await prisma.find.Unique({where : {id : number (id)} } )
}

const createRole = async (data) => {
    return await prisma.rol.create({ data })
}

const updateRole = async ( id, data ) => {
    return prisma.rol.update({
        where: { id: Number(id) }
    })
}

const deleteRole = async (id) => {
    return await prisma.rol.delete({
        where : {id: Number(id)}
    })
}

module.exports =  {
    getAllRoles,
    getRoleById,
    createRole,
    deleteRole,
    updateRole,
}