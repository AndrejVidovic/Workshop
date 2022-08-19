import { faShoppingCart, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CartCard from "../../components/CartWorkshopCard/CartCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleted_from_cart, edited_in_cart } from "../../redux/Slices/cart";
import { set_cart_open } from "../../redux/Slices/openCart";
import Checkout from "../Checkout/Checkout";
import "./Cart.css";

const ShoppingCart = () => {
  let data = useAppSelector((store) => store.cart.cart);
  let flag = useAppSelector((store) => store.open.value);
  const dispatch = useAppDispatch();

  const [cartItems, setCartItems] = useState(data);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [open, setOpen] = useState(flag);

  useEffect(() => {
    setOpen(flag);
  }, [flag]);

  useEffect(() => {
    setCartItems(data);
  }, [data]);

  const HandleOpen = () => {
    setOpen(!open);
    dispatch(set_cart_open(false));
  };
  const editCartCard = (card) => {
    let i = cartItems.indexOf(cartItems.find((item) => item.id === card.id));
    let final = [...cartItems.slice(0, i), card, ...cartItems.slice(i + 1, cartItems.length + 1)];
    dispatch(edited_in_cart(card));
    setCartItems(final);
  };
  const deleteCartCard = (card) => {
    let i = cartItems.indexOf(cartItems.find((item) => item.id === card.id));
    let final = [...cartItems.slice(0, i), ...cartItems.slice(i + 1, cartItems.length + 1)];
    setCartItems(final);
    dispatch(deleted_from_cart(card));
  };
  const GetTotalPrice = () => {
    let price = 0;
    cartItems.map((item) => (price = price + item.price * item.count));

    return price;
  };
  const FinishBuy = () => {
    setOpenCheckout(true);
    setOpen(false);
  };
  return (
    <div className="shopping-cart-container">
      <div onClick={HandleOpen} style={{ alignItems: "center", display: "flex" }}>
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {cartItems.length !== 0 ? <h4>{cartItems.length} radionica/e</h4> : <h4>Košarica je prazna.</h4>}
      </div>
      {open && (
        <div className="shopping-cart-details">
          <div className="shopping-cart-header">
            <div>
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              <p style={{ marginLeft: "1rem" }}>{cartItems.length} radionica/e</p>
            </div>
            <FontAwesomeIcon icon={faX} size="lg" onClick={HandleOpen} />
          </div>
          <div style={{ overflow: "auto" }}>
            {cartItems.map((item) => (
              <CartCard key={item.id} card={item} editCartCard={(card) => editCartCard(card)} deleteCartCard={(card) => deleteCartCard(card)} />
            ))}
          </div>
          <div className={`total-price-container ${cartItems.length !== 0 ? null : "disable"}`}>
            <p>UKUPNO</p>
            <h2>{GetTotalPrice()},00 €</h2>
          </div>
          <button className={`buy-button ${cartItems.length !== 0 ? null : "disable"}`} onClick={FinishBuy}>
            Izvrši narudžbu
          </button>
        </div>
      )}
      {openCheckout && <Checkout setOpenCheckout={setOpenCheckout} />}
    </div>
  );
};
export default ShoppingCart;
