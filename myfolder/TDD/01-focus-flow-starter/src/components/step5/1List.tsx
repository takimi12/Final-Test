import ItemCard from './ItemCard';
import { type Item } from '../utils';

export default function List({
  items,
  onDelete,
}: {
  items: Item[];
  onDelete: (id: string) => void;
}) {
  return (
<div>list</div>
  );
}
