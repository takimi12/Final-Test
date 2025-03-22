import { Trash2 } from 'lucide-react';

type ItemCardProps = {

  onDelete: (id: string) => void;
};



const ItemCard = ({
  id,
  title,
  description,
  category,
  onDelete,
}: ItemCardProps) => {
  return (
   <div>Item Card</div>
  );
};
export default ItemCard;
