import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "shared/components";

import { Section, Title, Text, List, ListItem } from "./components";

type EventDefaultDescriptionProps = {
  type: any;
  titleVars: any;
  body: any;
  controller: any;
};

function EventDefaultDescription({
  type,
  titleVars,
  body,
  controller,
}: EventDefaultDescriptionProps) {
  const { t } = useTranslation();

  let variables: any = {};

  body &&
    Object.keys(body).forEach((key) => {
      // if (typeof body[key] === "object") return;
      variables[key] = body[key];
    });
  titleVars &&
    Object.keys(titleVars).forEach((key) => {
      variables[key] = titleVars[key];
    });

  Object.entries(variables).forEach(([key, value]) => {
    console.log(key, value);
  });

  const details: any = t(`${controller}:list.${type}.details`, {
    returnObjects: true,
    interpolation: { escapeValue: false },
    ...variables,
  });

  console.log({ details, body, titleVars, controller, type });
  if (typeof details !== "object") return null;

  return details?.map((detail: any, idx: any) => {
    const { subtitle, description, list, descriptionSecondary, listSecondary } =
      detail;
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
}

export const READY_TEMPLATES: any = {
  task: [1, 13, 14],
  incident: [],
};

type EventDescriptionProps = {
  controller: any;
  details: any;
};

export function EventDescription({
  controller,
  details,
}: EventDescriptionProps) {
  if (!controller || !details) return null;

  const isCustomTemplate =
    READY_TEMPLATES[controller] &&
    READY_TEMPLATES[controller].find((t: any) => t === details.type);
  const CustomTemplate = React.lazy(
    () => import(`./templates/task/${isCustomTemplate ?? "default"}`)
  );

  console.log({ details });

  return !isCustomTemplate ? (
    <EventDefaultDescription
      type={details.type}
      titleVars={details.titleVars}
      body={details.body}
      controller={controller}
    />
  ) : (
    <Suspense fallback={<Loader />}>
      <CustomTemplate {...details}>
        <EventDefaultDescription
          type={details.type}
          titleVars={details.titleVars}
          body={details.body}
          controller={controller}
        />
      </CustomTemplate>
    </Suspense>
  );
}
