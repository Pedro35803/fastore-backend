export interface PaginationParams {
  page: number;       // número da página atual (começa em 1 geralmente)
  limit: number;      // quantidade de registros por página
  sortBy?: string;    // campo para ordenação (opcional)
  order?: "asc" | "desc"; // direção da ordenação
  search?: string;    // termo de busca opcional
}
