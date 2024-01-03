import ProductContextProvider from "../../context/productContext";
import Main from "../../components/main";

export default function Home() {
  return (
    <>
      <ProductContextProvider>
          <Main />
      </ProductContextProvider>
    </>
  );
}
