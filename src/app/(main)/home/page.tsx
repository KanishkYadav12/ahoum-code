import React from "react";
import {
  FiGrid,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
} from "react-icons/fi";

export default function BottomNav() {
  const activeColor = "#53B175";
  const inactiveColor = "#181725";

  const items = [
    { icon: <FiGrid size={24} />, label: "Shop", active: true },
    { icon: <FiSearch size={24} />, label: "Explore" },
    { icon: <FiShoppingCart size={24} />, label: "Cart" },
    { icon: <FiHeart size={24} />, label: "Favourite" },
    { icon: <FiUser size={24} />, label: "Account" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "92px",
        background: "#fff",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: "2px -5px 15px rgba(85,94,88,0.09)",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        zIndex: 100,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
            color: item.active ? activeColor : inactiveColor,
          }}
        >
          {item.icon}

          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: item.active ? activeColor : inactiveColor,
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}