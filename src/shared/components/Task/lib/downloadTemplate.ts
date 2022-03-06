import { READY_TEMPLATES } from '../config/templates';

export default ({
  number,
  controller,
}: {
  number: number;
  controller: 'task' | 'incident';
}) => {
  const fileName = READY_TEMPLATES[controller].find((temp) => temp === Number(number));
  return require(`../templates/${controller}/${fileName || 'default'}`);
  // return React.lazy(() => import(`../templates/${controller}/${fileName || 'default'}`));
  // return File;
};
