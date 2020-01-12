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

export interface Node {
    node: Block;
    location: NodeIndexes;
} 

export interface Warning extends Node{
    text: string;
}

export interface Grid extends Node{
    columns: number;
    market: number;
}