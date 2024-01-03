import { createContext, useState } from "react";

export const ProductContext = createContext<any>(undefined);

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [view, setView] = useState<object>({});
  return (
    <ProductContext.Provider value={{ view, setView }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
