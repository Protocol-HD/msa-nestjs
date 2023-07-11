export class PrismaRepository<T> {
  prismaService: T;
  entityName: string;

  constructor(prismaService: T, entityName: string) {
    this.prismaService = prismaService;
    this.entityName = entityName;
  }

  async findOneById<T>(where: { [key: string]: T }) {
    return await this.prismaService[this.entityName].findUnique({ where });
  }

  async findOneBy<T>(where: { [key: string]: T }) {
    return await this.prismaService[this.entityName].findFirst({ where });
  }

  async findAll() {
    return await this.prismaService[this.entityName].findMany();
  }

  async findAllBy<T>(where: { [key: string]: T }) {
    return await this.prismaService[this.entityName].findMany({ where });
  }

  async create<T>(data: T) {
    return await this.prismaService[this.entityName].create({ data });
  }

  async update<T, D>(where: { [key: string]: T }, data: D) {
    return await this.prismaService[this.entityName].update({ where, data });
  }

  async updateMany<T, D>(where: { [key: string]: T }, data: D) {
    return await this.prismaService[this.entityName].updateMany({
      where,
      data,
    });
  }

  async delete<T>(where: { [key: string]: T }) {
    return await this.prismaService[this.entityName].delete({ where });
  }
}
