export function getNipError(params: {
  clientNip: string;
  clientNipExists: { exists: boolean } | undefined;
  formErrors: Partial<{
    client: Partial<{ nip: string }> | string;
  }>;
  editNip?: string;
}): string | undefined {
  const { clientNip, clientNipExists, formErrors, editNip } = params;

  if (!clientNip) return undefined;

  if (clientNipExists === undefined) {
    if (formErrors.client && typeof formErrors.client === "object") {
      return formErrors.client.nip ?? undefined;
    }
    if (formErrors.client && typeof formErrors.client === "string") {
      return formErrors.client;
    }
    return undefined;
  }

  if (clientNipExists.exists) {
    return editNip === clientNip ? undefined : "NIP already exists";
  }

  return undefined;
}