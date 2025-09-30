import { useQuery } from "@tanstack/react-query"
import { getCheckClientNipExists } from "../services/clientService"
import { useDebounce } from "../utils/useDebounce";

export const useCheckClientNipExists = (nip: string, shouldFetch?: boolean) => {
    const debouncedNip = useDebounce(nip, 500);

    return useQuery<{exists: boolean}, Error>({
        queryKey: ['checkClientNipExists', debouncedNip],
        queryFn: () => getCheckClientNipExists(debouncedNip),
        enabled: !!debouncedNip && shouldFetch
    });
}