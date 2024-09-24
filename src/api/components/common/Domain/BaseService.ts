

export interface BaseService <M extends { id: string }>{
    
    findById(id: string, options?: any): Promise<M | null>
    findByProp(options?: any): Promise<M[]>
    findAll(options?: any): Promise<M[]>
    create(resource: M): Promise<M>
    createMany(resource: M[]): Promise<M[]>
    update(id: string, data: Partial<M>): Promise<M>
    updateMany(data: Array<Partial<M & { id: string }>>): Promise<M[]> 
    delete(id: string): void
}