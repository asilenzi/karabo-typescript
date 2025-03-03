import chai from 'chai';
const expect = chai.expect;

import { HashTypes, makeHash } from '../src/index'

// to be able to print BigInt https://stackoverflow.com/questions/65152373/typescript-serialize-bigint-in-json
(BigInt.prototype as any).toJSON = function() {
    return this.toString()
} 

describe("helper", function() {
    it('writing', function() {
        {
            const hsh = makeHash({
                key1: 1,
                key2: "testString"
            });
            expect(hsh.type_).to.be.equal(HashTypes.Hash);
            expect(hsh.value_.key1.value.type_).to.be.equal(HashTypes.Int32);
            expect(hsh.value_.key1.value.value_).to.be.equal(1);
            expect(hsh.value_.key1.attrs).to.be.an('object').that.is.empty;
            expect(hsh.value_.key2.value.type_).to.be.equal(HashTypes.String);
            expect(hsh.value_.key2.value.value_).to.be.equal("testString");
            expect(hsh.value_.key2.attrs).to.be.an('object').that.is.empty;
        }
        {
            const hsh = makeHash({
                key1: ["testString"],
            });
            expect(hsh.type_).to.be.equal(HashTypes.Hash);
            expect(hsh.value_.key1.value.type_).to.be.equal(HashTypes.VectorString);
            expect(hsh.value_.key1.value.value_).to.be.deep.equal(["testString"]);
            expect(hsh.value_.key1.attrs).to.be.an('object').that.is.empty;
        }
        {
            const hsh = makeHash({
                key1: [1],
            });
            expect(hsh.type_).to.be.equal(HashTypes.Hash);
            expect(hsh.value_.key1.value.type_).to.be.equal(HashTypes.VectorInt32);
            expect(hsh.value_.key1.value.value_).to.be.deep.equal([1]);
            expect(hsh.value_.key1.attrs).to.be.an('object').that.is.empty;
        }
        {
            const hsh = makeHash({
                key1: [3.14],
            });
            expect(hsh.type_).to.be.equal(HashTypes.Hash);
            expect(hsh.value_.key1.value.type_).to.be.equal(HashTypes.VectorFloat64);
            expect(hsh.value_.key1.value.value_).to.be.deep.equal([3.14]);
            expect(hsh.value_.key1.attrs).to.be.an('object').that.is.empty;
        }
        {
            const hsh = makeHash({
                key1: 3.14,
            });
            expect(hsh.type_).to.be.equal(HashTypes.Hash);
            expect(hsh.value_.key1.value.type_).to.be.equal(HashTypes.Float64);
            expect(hsh.value_.key1.value.value_).to.be.deep.equal(3.14);
            expect(hsh.value_.key1.attrs).to.be.an('object').that.is.empty;
        }
        {
            const hsh = makeHash({
                key1: [],
            });
            expect(hsh.type_).to.be.equal(HashTypes.Hash);
            expect(hsh.value_.key1.value.type_).to.be.equal(HashTypes.VectorString);
            expect(hsh.value_.key1.value.value_).to.be.deep.equal([]);
            expect(hsh.value_.key1.attrs).to.be.an('object').that.is.empty;
        }
        {
            const hsh = makeHash({
                key1: {sub_key: 1},
            });
            expect(hsh.type_).to.be.equal(HashTypes.Hash);
            expect(hsh.value_.key1.value.type_).to.be.equal(HashTypes.Hash);
            expect(hsh.value_.key1.attrs).to.be.an('object').that.is.empty;
            expect(hsh.value_.key1.value.value_.sub_key.value.value_).to.be.equal(1);
            expect(hsh.value_.key1.value.value_.sub_key.value.type_).to.be.equal(HashTypes.Int32);
            expect(hsh.value_.key1.value.value_.sub_key.attrs).to.be.an('object').that.is.empty;
        }
        {
            const hsh = makeHash({
                key1: [{sub_key: 1}, {sub_key: 2}],
            });

            process.stdout.write("\n");
            process.stdout.write(JSON.stringify(hsh));
            expect(hsh.type_).to.be.equal(HashTypes.Hash);
            expect(hsh.value_.key1.value.type_).to.be.equal(HashTypes.VectorHash);
            expect(hsh.value_.key1.attrs).to.be.an('object').that.is.empty;
            expect(hsh.value_.key1.value.value_[0].sub_key.value.value_).to.be.equal(1);
            expect(hsh.value_.key1.value.value_[1].sub_key.value.value_).to.be.equal(2);
        }
    });

})