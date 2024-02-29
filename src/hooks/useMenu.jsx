import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
// import { useEffect, useState } from "react";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    // const [menu, setMenu] = useState([]);
    // const [loader, setLoader] = useState(true);

    // useEffect(() => {
    //     fetch('https://bistro-boss-restaurant-server-alpha.vercel.app/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoader(false);
    //         })
    // }, [])

    // NOTE: now we will follow tanstack query instead of fetch in useEffect 

    const { data: menu = [], refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get("/menu");
            return res.data;
        }
    })

    return [menu, refetch];
};

export default useMenu;