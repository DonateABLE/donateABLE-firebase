import { useCallback, useEffect, useState } from "react";

export interface FieldOptions {
    readonly?: boolean;
}

export interface StaticModel<T extends Model> {
    options: { [field: string]: FieldOptions | undefined };
    new (): T;
}

export default abstract class Model {
    /* Model has 8 main methods, builder, find, subscribe, field, save, delete
    , toJSON and hasChanges */

    public static options: { [field: string]: FieldOptions | undefined };

    public static builder<T extends Model>(
        this: StaticModel<T>
    ): QueryBuilder<T> {
        const m = new this();
        return new QueryBuilder(this, m.collection);
    }

    public static async find<T extends Model>(
        this: StaticModel<T>,
        id: string
    ): Promise<T | null> {
        const m = new this();
        const doc = await m.collection.doc(id).get();
        Object.assign(m, {
            ...doc.data(),
            id: doc.id,
        });
        m.postSave();
        return m;
    }

    public static subscribe<T extends Model>(
        this: StaticModel<T>,
        id: string,
        callback: (models: T) => void
    ): () => void {
        return new this().collection.doc(id).onSnapshot((doc) => {
            const m = new this();
            Object.assign(m, {
                ...doc.data(),
                id: doc.id,
            });
            m.postSave();
            callback(m);
        });
    }

    public static field(
        options: FieldOptions = {}
    ): (type: Model, f: string) => void {
        return (type, f) => {
            const constructor = type.constructor as StaticModel<Model>;
            if (constructor.options === undefined) {
                constructor.options = {};
            }
            constructor.options[f] = options;
            return {
                get: function (this: Model): any {
                    if (this.attributes.hasOwnProperty(f)) {
                        return this.attributes[f];
                    }
                    return this.original[f];
                },
                set: function (this: Model, value: any): void {
                    if (this.original[f] === value) {
                        delete this.attributes[f];
                    } else {
                        this.attributes[f] = value;
                    }
                },
            };
        };
    }

    public readonly id: string | undefined;

    public abstract readonly collection: firebase.firestore.CollectionReference;

    private original: { [key: string]: any } = {};
    private attributes: { [key: string]: any } = {};

    // Method to Save
    public async save(): Promise<void> {
        const saveObject: any = {};

        this.saving();

        for (const key of Object.keys(
            (this.constructor as StaticModel<Model>).options
        )) {
            const value = (this as any)[key];
            const options = (this.constructor as StaticModel<Model>).options[
                key
            ];
            if (value === undefined) {
                continue;
            }
            if (options?.readonly) {
                continue;
            }
            saveObject[key] = value;
        }

        if (this.id === undefined) {
            const docRef = await this.collection.add(saveObject);
            (this as any).id = docRef.id;
        } else {
            await this.collection.doc(this.id).set(saveObject, { merge: true });
        }
        this.postSave();
        this.saved();
    }

    // Post Save Method used in save
    public postSave(): void {
        this.original = {
            ...this.original,
            ...this.attributes,
        };
        this.attributes = {};
    }

    // Deletion Method
    public async delete(): Promise<void> {
        this.deleting();
        if (this.id === undefined) {
            return;
        }
        await this.collection.doc(this.id).delete();
        this.deleted();
    }

    public hasChanges(): boolean {
        return Object.keys(this.attributes).length > 0;
    }

    public toJSON(): unknown {
        return {
            ...this.original,
            ...this.attributes,
        };
    }

    protected saving(): void {
        // this should stay empty
    }
    protected saved(): void {
        // this should stay empty
    }
    protected deleting(): void {
        // this should stay empty
    }
    protected deleted(): void {
        // this should stay empty
        // alright man it will stay empty
    }
}

// QueryBuilder builds on Model
export class QueryBuilder<T extends Model> {
    private readonly staticModel: StaticModel<T>;
    private readonly query: firebase.firestore.Query;
    private readonly key: Set<string>;

    constructor(staticModel: StaticModel<T>, query: firebase.firestore.Query) {
        this.staticModel = staticModel;
        this.query = query;
        this.key = new Set<string>();
    }

    public where<K extends keyof T>(
        fieldPath: K,
        opStr: firebase.firestore.WhereFilterOp,
        value: T[K]
    ): QueryBuilder<T> {
        this.key.add(
            `where ${JSON.stringify(fieldPath)} ${opStr} ${JSON.stringify(
                value
            )}`
        );
        return new QueryBuilder(
            this.staticModel,
            this.query.where(fieldPath as string, opStr, value)
        );
    }

    public orderBy(
        fieldPath: keyof T,
        directionStr: firebase.firestore.OrderByDirection = "asc"
    ): QueryBuilder<T> {
        this.key.add(`orderBy ${JSON.stringify(fieldPath)} ${directionStr}`);
        return new QueryBuilder(
            this.staticModel,
            this.query.orderBy(fieldPath as string, directionStr)
        );
    }
    public limit(limit: number): QueryBuilder<T> {
        this.key.add(`limit ${limit}`);
        return new QueryBuilder(this.staticModel, this.query.limit(limit));
    }

    public async get(): Promise<T[]> {
        const ref = await this.query.get();

        return ref.docs.map((doc) => {
            const model = new this.staticModel();
            Object.assign(model, {
                ...doc.data(),
                id: doc.id,
            });
            model.postSave();
            return model;
        });
    }

    public subscribe(callback: (models: T[]) => void): () => void {
        return this.query.onSnapshot((ref) => {
            callback(
                ref.docs.map((doc) => {
                    const model = new this.staticModel();
                    Object.assign(model, {
                        ...doc.data(),
                        id: doc.id,
                    });
                    model.postSave();
                    return model;
                })
            );
        });
    }

    public equal(q: QueryBuilder<T>): boolean {
        return this.query.isEqual(q.query);
    }

    public hash(): string {
        return Array.from(this.key).sort().join(" ");
    }
}

export function useQuery<T extends Model>(q: QueryBuilder<T>): T[] | undefined {
    const [list, changeList] = useState<T[]>();

    useEffect(() => q.subscribe(changeList), [q.hash()]);

    return list;
}
