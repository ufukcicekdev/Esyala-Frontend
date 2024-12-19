import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useCart } from "../context/CartContext";

const CartIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { cartCount } = useCart();  // CartContext'ten cartCount ve sessionKey alınır

  return (
    <Badge badgeContent={cartCount > 0 ? cartCount : null} color="primary">
      <ShoppingCartIcon sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} onClick={onClick} />
    </Badge>
  );
};

export default CartIcon;
