import { useState } from 'react';
import { IUseAuthSchema } from 'src/features/auth/interfaces/auth.interface';

const useAuthSchema = ({ schema, userInfo }: IUseAuthSchema): [() => Promise<boolean>, string[]] => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  async function schemaValidation(): Promise<boolean> {
    await schema
      .validate(userInfo, { abortEarly: false })
      .then(() => setValidationErrors([]))
      .catch((err) => {
        setValidationErrors([...err.errors]);
      });
    const validation: boolean = await schema.isValid(userInfo, { abortEarly: false });
    return validation;
  }
  return [schemaValidation, validationErrors];
};

export { useAuthSchema };
