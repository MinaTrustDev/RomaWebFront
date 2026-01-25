"use server";

import { getGuestIdUseCase } from "@/core/di";
import { z } from "zod";
import { createServerAction } from "zsa";

export const getGuestIdAction = createServerAction()
.handler(async () => {
    try {
        console.log("getGuestIdAction");
        const guestId = await getGuestIdUseCase.execute();
        return JSON.parse(JSON.stringify(guestId));
    } catch (error) {
        console.error("getGuestIdAction error:", error);
        throw error;
    }
});