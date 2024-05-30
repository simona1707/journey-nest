import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon?: JSX.Element;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  icon 
}) => {
  return (
    <div
      onClick={onClick}
      className="
      px-4
      py-3
      hover:bg-neutral-100
      transition
      font-semibold
      flex
      items-center // Добавяме flex контейнер за центриране на иконката
      "
    >
      {icon && <span className="mr-2">{icon}</span>} 
      {label}
    </div>
  );
};

export default MenuItem;
