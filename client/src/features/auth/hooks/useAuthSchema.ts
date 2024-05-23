import { useState } from 'react';
import { IUseAuthSchema } from 'src/features/auth/interfaces/auth.interface';
import { validationErrorsType } from 'src/shared/common.interface';

const useAuthSchema = ({
  schema,
  userInfo
}: IUseAuthSchema): [() => Promise<[boolean, validationErrorsType[]]>, validationErrorsType[]] => {
  const [validationErrors, setValidationErrors] = useState<validationErrorsType[]>([]);

  async function schemaValidation(): Promise<[boolean, validationErrorsType[]]> {
    try {
      await schema.validate(userInfo, { abortEarly: false });
      setValidationErrors([]);
      return [true, []];
    } catch (err) {
      if (err) {
        setValidationErrors(err.errors);
      }
      return [false, err.errors || []];
    }
  }

  return [schemaValidation, validationErrors];
};

export { useAuthSchema };
