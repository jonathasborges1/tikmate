/**
 * Lança uma nova instância de erro com mensagem apropriada.
 */
export function handleError(error: unknown, defaultMessage: string): never {
  if (error instanceof Error) {
    throw new Error(`${defaultMessage}: ${error.message}`);
  } else {
    throw new Error(defaultMessage);
  }
}
