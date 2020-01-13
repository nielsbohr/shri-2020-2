// Используемые ts типы

export interface LintError {
    code: string;
    error: string;
    location: NodeLocation;
}

export interface CacheNode {
    type: string;
    nodes: Array<Node>
}

export interface NodeLocation {
    start: Location;
    end: Location;
}

export interface Location {
    column: number;
    line: number;
}

export interface Node {
    node: Block;
    location: NodeIndexes;
    text?: string;
    columns?: number;
    market?: number;
}

export interface NodeIndexes {
    start: number;
    end: number;
}

export interface Block {
    block?: string;
    content?: any;
    mods?: any;
    elemMods?: any;
}
