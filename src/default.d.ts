declare const __DEVELOPMENT__: boolean;

type Diff<T, U> = T extends U ? never : T; // Remove types from T that are assignable to U
type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U

type FilterPropertyNames<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer U ? U : never

declare module "@ungap/event-target" {
    export = EventTarget;
}
