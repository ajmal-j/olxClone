import Main from "../../components/main";
import ProductContextProvider from "../../context/productContext";

export default function Home() {
  return (
    <>
      <ProductContextProvider>
        <Main />
      </ProductContextProvider>
    </>
  );
}
