import * as repository from "./repository";
import { ClienteDto } from "./dtos/cliente.dto";

export async function getClientes() {
  return await repository.findAll();
}
export async function getCliente(id: string) {
  return await repository.findById(id);
}
export async function createCliente(data: ClienteDto) {
  try {
    const result = ClienteDto.parse(data);
    return await repository.create(result);
  } catch (error) {
    throw error;
  }
}
export async function updateCliente(id: string, data: ClienteDto) {
  try {
    const result = ClienteDto.parse(data);
    await repository.update(id, result);
  } catch (error) {
    throw error;
  }
}
export async function deleteCliente(id: string) {
  return await repository.remove(id);
}
