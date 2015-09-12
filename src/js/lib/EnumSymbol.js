/**
 * Created by roderickWang on 7/26/15.
 */
export default class EnumSymbol {
    sym = Symbol.for(name);
    value: number;
    description: string;

    constructor(name: string, {value, description}) {

        if(!Object.is(value, undefined)) this.value  = value;
        if(description) this.description  = description;

        Object.freeze(this);
    }

    get display() {
        return this.description || Symbol.keyFor(this.sym);
    }

    toString() {
        return this.sym;
    }

    valueOf() {
        return this.value;
    }
}
