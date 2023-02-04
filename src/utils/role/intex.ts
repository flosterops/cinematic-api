import { ERoles } from '../../enums/role';

const isRole = (value: string): value is ERoles => {
  return value === ERoles.admin || value === ERoles.user;
};

export { isRole };
