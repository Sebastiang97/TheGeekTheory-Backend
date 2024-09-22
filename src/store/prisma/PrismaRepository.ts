import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(options?:any): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

export class PrismaRepository<T> implements Repository<T> {
  private model: string;

  constructor(model: string) {
    this.model = model;
  }

  async findById(id: string, options?:any): Promise<T | null> {
    const model = prisma[this.model as keyof typeof prisma] as any;
    return model.findUnique({ 
      where: { id } ,
      ...options
    })
  }

  async findByProp(options :any): Promise<T | null> {
    const model = prisma[this.model as keyof typeof prisma] as any;
    return model.findMany(options)
  }

  async findAll(options:any): Promise<T[]> {
    const model = prisma[this.model as keyof typeof prisma] as any;
    return model.findMany(options)
  }

  async create(data: Partial<T>): Promise<T> {
    const model = prisma[this.model as keyof typeof prisma] as any;
    return model.create({ data })
  }

  async createMany(data: Partial<T[]>): Promise<T[]> {
    const model = prisma[this.model as keyof typeof prisma] as any;
    const res = data.map( async d =>{
      const result = await model.create({ data: d })
      return result
    })
    return await Promise.all(res)
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const model = prisma[this.model as keyof typeof prisma] as any;
    return model.update({ where: { id },   data })
  }

  async updateMany(data: Array<Partial<T & { id: string }>>): Promise<T[]> {
    const model = prisma[this.model  as keyof typeof prisma] as any;
    let elements: T[] = []
    for (const el of data) {
      const element = await model.update({ 
        where: { id: el?.id as any},
        data: el }
      )
      elements.push(element)
    }
    return  Promise.resolve(elements)
  }

  async delete(id: string): Promise<boolean> {
    const model = prisma[this.model as keyof typeof prisma] as any;
    await model.delete({ where: { id } })
    return true
  }
}