import { Suspense, lazy } from "react";
const Create = lazy(() => import("../../components/create"));
import ProtectedRoute from "../../components/protectedRoute";

export default function CreateProduct() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={<span className='block py-10 text-center'>loading...</span>}
      >
        <Create />
      </Suspense>
    </ProtectedRoute>
  );
}
