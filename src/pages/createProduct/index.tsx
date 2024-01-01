import Create from "../../components/create";
import ProtectedRoute from "../../components/protectedRoute";

export default function CreateProduct() {
  return (
    <ProtectedRoute>
      <Create />
    </ProtectedRoute>
  );
}
