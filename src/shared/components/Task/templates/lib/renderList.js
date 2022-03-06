import { arrayItems } from './';
import { List, ListItem } from '../components';

export default ({ variant, i, quantity, text, variables }) => (
  <List dots="none">
    {arrayItems(quantity).map((j) => (
      <ListItem key={j}>{text ? text : variant(i, j, variables)}</ListItem>
    ))}
  </List>
);
