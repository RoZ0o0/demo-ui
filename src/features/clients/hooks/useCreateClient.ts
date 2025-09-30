import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ClientRequest } from "../../../types/client";
import { createClient } from "../services/clientService";

export const useCreateClient = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, ClientRequest>({
        mutationKey: ["createClient"],
        mutationFn: (client: ClientRequest) => createClient(client),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
    })
}