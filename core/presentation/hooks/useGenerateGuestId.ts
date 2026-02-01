import { useMutation, useQuery } from "@tanstack/react-query"
import { getGuestIdAction } from "../actions/get-guest-id.action"

export const useGetGuestId = () => {
    return useQuery({
        queryKey: ["guest_id"],
        queryFn: async () => {
            const [guest_id, error] = await getGuestIdAction();

            return guest_id
        }
    })
}

export const useGenerateGuestId = () => {
    return useMutation({
        mutationKey: ["generate_guest_id"],
        mutationFn: async () => {
            const [guest_id, error] = await getGuestIdAction();

            return guest_id
        }
    })
}