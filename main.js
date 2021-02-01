var _ = require("underscore")._;

class ArrayHandle {
    constructor() {
    }
    ArrData(_arrData) {
        this.arrData = _arrData;
        return this;
    }
    map(_mapHandle) {
        this.mapHandle = _mapHandle;
        return this;
    }
    reverse() {
        this.reverse = true;
        return this;
    }
    slice(_start, _end) {
        this.start = _start;
        this.end = _end;
        return this;
    }
    take(_count) {
        this.count = _count;
        return this;
    }
    filter(_filter) {
        this.filterHandler = _filter;
        return this;
    }
    value() {
        if (this.arrData == null) {
            return [];
        }
        var _count = this.end - this.start;
        var _start = this.start;
        var end = this.end;
        if (_count > this.count) {
            _count = this.count;
        }
        const rtData = [];
        var length = this.arrData.length - 1;
        for (var i = 0; i < length && _count > 0; ++i) {
            let data = this.reverse === true ? this.arrData[length - i] : this.arrData[i];
            data = this.mapHandle(data);
            if (this.filterHandler(data) === true) {

                if (_start > 0) {
                    --_start
                }
                else {
                    --_count;
                    rtData.push(data);
                }
            }
        }
        return rtData;
    }
}
var ah = new ArrayHandle();
const __ = ah.ArrData.bind(ah);

const SIZE = 2000_0000;

ary = _.range(SIZE);

let x = 0;
console.time('origin_method');
targets = ary.map(v => {
    x++;
    return v + 1;
}).filter(v => {
    x++;
    return v % 2 == 0;
}).reverse().slice(1, 4);
console.timeEnd('origin_method');
console.log(targets, x, ' time');


ary = _.range(SIZE);

x = 0;
console.time('t1');
targets = __(ary).map(v => {
    x++;
    return v + 1;
}).filter(v => {
    x++;
    return v % 2 == 0;
}).reverse().slice(1, 5).take(3).value();
console.timeEnd('t1');
console.log(targets, x, ' time');