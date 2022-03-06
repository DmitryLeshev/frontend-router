import { matchPath } from "react-router-dom";

import { NavigationListItem } from "..";

import { List } from "@material-ui/core";

const NavigationList = (props: any) => {
  const { pages, router, depth, taskCounter } = props;

  return (
    <List>
      {pages.reduce(
        (items: any, page: any) =>
          reduceChildRoutes({ items, page, router, depth, taskCounter }),
        []
      )}
    </List>
  );
};

const reduceChildRoutes = (props: any) => {
  const { router, items, page, depth, taskCounter } = props;

  const isActive = window.location.pathname.includes(page.isActive);

  if (page.children) {
    const open = matchPath(router.location.pathname, {
      path: page.href,
      exact: false,
    });

    items.push(
      <NavigationListItem
        taskCounter={taskCounter}
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)}
        title={page.title}
        i18nkey={page.i18nkey}
      >
        <NavigationList
          depth={depth + 1}
          pages={page.children}
          router={router}
        />
      </NavigationListItem>
    );
  } else {
    items.push(
      <NavigationListItem
        taskCounter={taskCounter}
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        label={page.label}
        title={page.title}
        i18nkey={page.i18nkey}
        isActive={isActive}
      />
    );
  }

  return items;
};

export default NavigationList;
