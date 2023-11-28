import { prismaConnection } from '../../scripts/prismaConection'
import { ClienteDto } from './dtos/cliente.dto';

const clientesRepository = prismaConnection.cliente;

export const findAll = async () => {
    return await clientesRepository.findMany();
}

export const findById = async (id: string) => {
    return await clientesRepository.findUnique({
        where: {
            id
        }
    });
}

export const create = async (data: ClienteDto) => {
    return await clientesRepository.create({
        data
    });
}

export const update = async (id: string, data: ClienteDto) => {
    return await clientesRepository.update({
        where: {
            id
        },
        data
    });
}

export const remove = async (id: string) => {
    return await clientesRepository.delete({
        where: {
            id
        }
    });
}