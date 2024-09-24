
import { PrismaRepository } from "../../../../../store/prisma/PrismaRepository";
import { BaseService } from "../../Domain/BaseService";




export abstract class BaseServiceImpl<M extends { id: string }> implements BaseService<M> {
    private repository: PrismaRepository<M>;

    constructor(prismaRepository: PrismaRepository<M>) {
        this.repository = prismaRepository
    }
    
    async findById(id: string, options?: any): Promise<M | null> {
        return this.repository.findById(id, options)
    }

    findByProp(options?: any): Promise<M[]> {
        return this.repository.findByProp(options)
    }
    
    async findAll(options:any): Promise<M[]> {
        return this.repository.findAll(options)
    }

    async create(data: Partial<M>): Promise<M> {
        return this.repository.create(data)
    }

    createMany(resource: M[]): Promise<M[]> {
        throw this.repository.createMany(resource)
    }

    async update(id: string, data: Partial<M>): Promise<M> {
        return this.repository.update(id, data)
    }

    async updateMany(data: Array<Partial<M & { id: string }>>): Promise<M[]> {
        return this.repository.updateMany(data)
    }

    async delete(id: string): Promise<boolean> {
        return this.repository.delete(id)
    }

}