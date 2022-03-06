import { useTranslation } from 'react-i18next';

export default ({ tMain, number }) => {
  const { t } = useTranslation();
  const tMainValue = number ? `tasks_task-type.${number}.task_details` : tMain;

  const getTitle = (i) => t(`${tMainValue}.detail_title_${i}`);

  const getText = (i, variables) => t(`${tMainValue}.detail_description_${i}`, variables);

  const getTextSecondary = (i, variables) =>
    t(`${tMainValue}.detail_description_${i}_secondary`, variables);

  const getListItem = (i, j, variables) =>
    t(`${tMainValue}.detail_description_${i}_list.${j}`, variables);

  const getListItemSecondary = (i, j, variables) =>
    t(`${tMainValue}.detail_description_${i}_list_secondary.${j}`, variables);

  return {
    getTitle,
    getText,
    getTextSecondary,
    getListItem,
    getListItemSecondary,
  };
};
