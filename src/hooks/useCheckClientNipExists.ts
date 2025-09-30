import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "./useDebounce";
import { getCheckClientNipExists } from "../features/clients/services";

export const useCheckClientNipExists = (nip: string, shouldFetch?: boolean) => {
    const debouncedNip = useDebounce(nip, 500);

    return useQuery<{exists: boolean}, Error>({
        queryKey: ['checkClientNipExists', debouncedNip],
        queryFn: () => getCheckClientNipExists(debouncedNip),
        enabled: !!debouncedNip && shouldFetch
    });
}