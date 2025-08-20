import { Repository, ObjectLiteral } from "typeorm";

export const checkUniqueFields = async <T extends ObjectLiteral>(
  repo: Repository<T>,
  fields: Partial<T>
): Promise<string[]> => {
  const errors: string[] = [];

  for (const [key, value] of Object.entries(fields)) {
    const exists = await repo.findOne({ where: { [key]: value } as any });
    if (exists) {
      errors.push(`${key} already exists`);
    }
  }

  return errors;
};
