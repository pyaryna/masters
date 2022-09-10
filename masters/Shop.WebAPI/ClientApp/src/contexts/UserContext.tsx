import { useState, createContext, ReactNode, FC, memo } from 'react';

import { IBaseUser } from '../types/IBaseUser';

type UserAction = React.Dispatch<React.SetStateAction<IBaseUser | undefined>>;

export const UserContext = createContext<[IBaseUser | undefined, UserAction]>({} as [IBaseUser, UserAction]);

export const UserProvider: FC<{ children: ReactNode }> = memo((props: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<IBaseUser | undefined>();

    return (
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
            {props.children}
        </UserContext.Provider>
    );
}
);