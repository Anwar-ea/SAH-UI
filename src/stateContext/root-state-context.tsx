// import React, { createContext, useContext, useState } from "react";

// // Define the shape of our User
// export type Gender = "Male" | "Female" | "Others";

// export interface User {
//   id: number;
//   name: string;
//   active: boolean;
//   dateOfBirth: Date;
//   age: number;
//   privilages: Array<string>;
//   gender: Gender;
// }

// // Define the shape of the context
// interface UserContextType {
//   Users: User[];
//   addUser: (name: User) => void;
//   updateUser: (name: User) => void;
//   deleteUser: (id: number) => void;
// }
// interface UserProviderProps {
//   children: React.ReactNode;
// }
// // Create the context
// const UserContext = createContext<UserContextType | undefined>(undefined);

// // Create a provider component
// export const UserProvider: React.FC<UserProviderProps> = ({
//   children,
// }: any) => {
//   const [Users, setUsers] = useState<User[]>([]);

//   const addUser = (user: User) => {
//     const newUser: User = {
//       ...user,
//       id: new Date().getTime(),
//     };
//     setUsers((prevUsers) => [...prevUsers, newUser]);
//   };

//   const updateUser = (user: User) => {
//     let loopUsers = [...Users];
//     for (let u of loopUsers) {
//       if (u.id === user.id) {
//         u = user;
//       }
//     }
//     setUsers((prevUsers) => loopUsers);
//   };

//   const deleteUser = (id: number) => {
//     setUsers((prevUsers) => prevUsers.filter((User) => User.id !== id));
//   };

//   return (
//     <UserContext.Provider value={{ Users, addUser, deleteUser, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use the context
// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within an UserProvider");
//   }
//   return context;
// };
