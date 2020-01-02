declare module 'helpers' {
    export interface LintError {
        code: string,
        error: string,
        location: BlockLocation
    }

    export interface BlockLocation {
        start: Location,
        end: Location
    }

    export interface Location {
        line: number,
        column: number
    }

    export interface Index {
        start: number,
        end: number
    }
}