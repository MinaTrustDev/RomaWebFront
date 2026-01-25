"use client";

import { getGuestIdUseCase } from "@/core/di";
import { getGuestIdAction } from "@/core/presentation/actions/get-guest-id.action";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const GetGuestId = () => {
    const { data: guestId, isLoading } = useQuery({
        queryKey: ["guestId"],
        queryFn: async () => {
            const [guestId, _] = await getGuestIdAction();
            return guestId;
        },
    });
    return null;
}