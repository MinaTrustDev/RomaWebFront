"use client"

import { useEffect, useState } from "react";
import { useGenerateGuestId } from "./useGenerateGuestId";

export const useGuestId = () => {
  const { mutateAsync: generateGuestId } = useGenerateGuestId();
    const [guestId, setGuestId] = useState<string | null>(null);
    useEffect(() => {
        const guestId = localStorage.getItem("guest_id");
        if (guestId) {
            setGuestId(guestId);
        } else {
            generateGuestId().then((newGuestId) => {
                localStorage.setItem("guest_id", newGuestId);
                setGuestId(newGuestId);
                alert(newGuestId);
            });
            
        }
    }, []);
    return { guestId, isLoading: !guestId };
}