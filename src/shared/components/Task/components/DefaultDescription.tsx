import React from 'react';
import { useTranslation } from 'react-i18next';

import { Section, Title, Text, List, ListItem } from '../templates/components';

export default ({ type, titleVars, body, controller }: any) => {
  const { t } = useTranslation();

  let variables: any = {};

  body &&
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === 'object') return;
      variables[key] = body[key];
    });
  titleVars &&
    Object.keys(titleVars).forEach((key) => {
      variables[key] = titleVars[key];
    });

  const details: any = t(`${controller}:list.${type}.details`, {
    returnObjects: true,
    ...variables,
  });

  if (typeof details !== 'object') return null;

  return details?.map((detail: any, idx: any) => {
    const { subtitle, description, list, descriptionSecondary, listSecondary } = detail;
    return (
      <Section key={idx}>
        {subtitle && <Title>{subtitle}</Title>}
        {description && <Text>{description}</Text>}
        {list && (
          <List>
            {list.map((item: any) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        )}
        {descriptionSecondary && <Text>{descriptionSecondary}</Text>}
        {listSecondary && (
          <List>
            {listSecondary.map((item: any) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        )}
      </Section>
    );
  });
};
