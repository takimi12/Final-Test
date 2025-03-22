import {  useMemo, useState, useCallback } from "react";
import { useApi } from "./useApi";
import { SingleUser } from "../types";


export const useUsers = () => {
    const { get } = useApi();
    const [users, setUsers] = useState<SingleUser[]>([]);

    const adults = useMemo(() => users.filter(user => user.age >= 18), [users]);

    const getUsers = async () => {
        const newUsers = await get<SingleUser[]>('users')
        setUsers(newUsers)
    }


    return {
        users,
        adults,
        getUsers, // Exposing this function allows manual refresh
    };
};
