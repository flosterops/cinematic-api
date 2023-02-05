export const getExistedFields = (value: Record<string, any>, fields: string[]) => {
  return fields.reduce((acc, key: string) => {
    if (value[key]) {
      return { ...acc, [key]: value[key] };
    }

    return acc;
  }, {});
};
