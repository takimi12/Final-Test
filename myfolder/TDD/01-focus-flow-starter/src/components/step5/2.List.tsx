import ItemCard from '../ItemCard';
import { type Item } from '../../utils';

export default function List({
  items,
  onDelete,
}: {
  items: Item[];
  onDelete: (id: string) => void;
}) {
  return (
    <section className='mt-8'>
      <h2 className='text-xl font-semibold mb-2'>Flow Board</h2>
    </section>
  );
}
