import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const useUserData = () => {
  const storeUser = useMutation(api.users.store);

  return {
    storeUser,
  };
};

export default useUserData;
