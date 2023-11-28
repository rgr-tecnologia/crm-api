import { prismaConnection } from "../../scripts/prismaConection";
import { ContratoDTO } from "./dtos/contrato.dto";

const repository =  prismaConnection.contrato;

export async function getContratos() {
    return await repository.findMany();
}

export async function getContrato(id: string) {
    return await repository.findUnique({
        where: {
            id
        }
    });
}

export async function getContratoByClienteId(clienteId: string) {
    return await repository.findMany({
        where: {
            clienteId
        }
    });
}

export async function createContrato(data: ContratoDTO) {
    const result = ContratoDTO.parse(data);
    return await repository.create({
        data: result
    });
}

export async function updateContrato(id: string, data: ContratoDTO) {
    const result = ContratoDTO.parse(data);
    return await repository.update({
        where: {
            id
        },
        data: result
    });
}

export async function deleteContrato(id: string) {
    return await repository.delete({
        where: {
            id
        }
    });
}