import type { QueryVariables } from "./Variables";

export type QuerySettings = {
    queryName: string;
    queryBase:string;
    queryVariables: QueryVariables;
}