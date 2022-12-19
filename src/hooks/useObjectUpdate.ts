// import { trpc } from "../utils/trpc";
// export function useUpdateObject<T, U>(
//   object: T,
//   updateFunction: (updateInput: U) => void,
//   updateInput: U
// ) {
//   const mutation = useMutation(updateFunction);

//   const handleUpdate = () => {
//     mutation.mutate({ ...object, ...updateInput });
//   };

//   return { handleUpdate };
// }