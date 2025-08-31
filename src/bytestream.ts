import { utf8ArrayToString, stringToUtf8Array } from './util.js'

export class ByteStream {
    payload: number[];
    bitoffset: number;
    offset: number;
    constructor(payload: number[]) {
        this.payload = payload;
        this.bitoffset = 0;
        this.offset = 0;
    }

    readInt(): number {
        this.bitoffset = 0;
        let result = this.payload[this.offset] << 24 | this.payload[this.offset + 1] << 16 | this.payload[this.offset + 2] << 8 | this.payload[this.offset + 3];
        this.offset += 4;
        return result;
    }

    readByte(): number {
        this.bitoffset = 0;
        let result = this.payload[this.offset];
        this.offset++;
        return result;
    }

    readShort(): number {
        this.bitoffset = 0;
        let result = this.payload[this.offset] << 8 | this.payload[this.offset + 1];
        this.offset += 2;
        return result;
    }

    readLong(): number {
        this.bitoffset = 0;
        let high = this.readInt();
        let low = this.readInt();

        return Number((BigInt(high) << 32n) | BigInt(low));
    }

    readString(): string {
        this.bitoffset = 0
        let length = this.readInt()
        let bytes = new Uint8Array(this.payload.slice(this.offset, this.offset + length))
        this.offset += length
        return utf8ArrayToString(bytes)
    }

    readVint(): number {
        let offset = this.offset
        this.bitoffset = 0
        let result = this.payload[offset] & 0x3F
        this.offset += 1

        if (this.payload[offset] & 0x40) {
            if (this.payload[offset] & 0x80) {
                result |= (this.payload[offset + 1] & 0x7F) << 6
                this.offset += 2

                if (this.payload[offset + 1] & 0x80) {
                    result |= (this.payload[offset + 2] & 0x7F) << 13
                    this.offset += 3

                    if (this.payload[offset + 2] & 0x80) {
                        result |= (this.payload[offset + 3] & 0x7F) << 20
                        this.offset += 4

                        if (this.payload[offset + 3] & 0x80) {
                            result |= this.payload[offset + 4] << 27
                            this.offset += 5
                            return result | 0x80000000
                        }
                        return result | 0xF8000000
                    }
                    return result | 0xFFF00000
                }
                return result | 0xFFFFE000
            }
            return this.payload[offset] | 0xFFFFFFC0
        }
        else if (this.payload[offset] & 0x80) {
            result |= (this.payload[offset + 1] & 0x7F) << 6
            this.offset += 2

            if (this.payload[offset + 1] & 0x80) {
                result |= (this.payload[offset + 2] & 0x7F) << 13
                this.offset += 3

                if (this.payload[offset + 2] & 0x80) {
                    result |= (this.payload[offset + 3] & 0x7F) << 20
                    this.offset += 4

                    if (this.payload[offset + 3] & 0x80) {
                        result |= this.payload[offset + 4] << 27
                        this.offset += 5
                    }
                }
            }
        }

        return result
    }

    readVlong(): number {
        let high = this.readVint();
        let low = this.readVint();

        return Number((BigInt(high) << 32n) | BigInt(low & 0xFFFFFFFF));
    }

    readBoolean(): number {
        this.bitoffset = 0;
        return this.payload[this.offset];
    }

    readDataReference(): number {
        let high = this.readVint();
        if (high == 0)
            return 0;
        let low = this.readVint();
        return Number((BigInt(high) << 32n) | BigInt(low & 0xFFFFFFFF));
    }

    writeByte(value: number) {
        //console.log("writeByte:", value);
        this.bitoffset = 0;
        this.payload.push(value & 0xFF);
        this.offset++;
    }

    writeShort(value: number) {
        //console.log("writeShort:", value);
        this.bitoffset = 0;
        this.payload.push((value >> 8) & 0xFF);
        this.payload.push(value & 0xFF);
        this.offset += 2;
    }

    writeInt(value: number) {
        //console.log("writeInt:", value);
        this.bitoffset = 0;
        this.payload.push((value >> 24) & 0xFF);
        this.payload.push((value >> 16) & 0xFF);
        this.payload.push((value >> 8) & 0xFF);
        this.payload.push(value & 0xFF);
        this.offset += 4;
    }

    writeLong(high: number, low: number) {
        //console.log("writeLong: high:", high, "low:", low);
        this.bitoffset = 0;
        this.writeInt(high);
        this.writeInt(low);
    }

    writeString(str: string) {
        //console.log("writeString:", str);
        this.bitoffset = 0;
        let bytes = stringToUtf8Array(str);
        this.writeInt(bytes.length);
        for (let i = 0; i < bytes.length; i++)
            this.writeByte(bytes[i]);
    }

    writeVint(value: number) {
        //console.log("writeVint:", value);
        this.bitoffset = 0;
        if (value < 0) {
            if (value >= -63) {
                this.payload.push((value & 0x3F) | 0x40);
                this.offset += 1;
            }
            else if (value >= -8191) {
                this.payload.push((value & 0x3F) | 0xC0);
                this.payload.push((value >> 6) & 0x7F);
                this.offset += 2;
            }
            else if (value >= -1048575) {
                this.payload.push((value & 0x3F) | 0xC0);
                this.payload.push(((value >> 6) & 0x7F) | 0x80);
                this.payload.push((value >> 13) & 0x7F);
                this.offset += 3;
            }
            else if (value >= -134217727) {
                this.payload.push((value & 0x3F) | 0xC0);
                this.payload.push(((value >> 6) & 0x7F) | 0x80);
                this.payload.push(((value >> 13) & 0x7F) | 0x80);
                this.payload.push((value >> 20) & 0x7F);
                this.offset += 4;
            }
            else {
                this.payload.push((value & 0x3F) | 0xC0);
                this.payload.push(((value >> 6) & 0x7F) | 0x80);
                this.payload.push(((value >> 13) & 0x7F) | 0x80);
                this.payload.push(((value >> 20) & 0x7F) | 0x80);
                this.payload.push((value >> 27) & 0xF);
                this.offset += 5;
            }
        }
        else {
            if (value <= 63) {
                this.payload.push(value & 0x3F);
                this.offset += 1;
            }
            else if (value <= 8191) {
                this.payload.push((value & 0x3F) | 0x80);
                this.payload.push((value >> 6) & 0x7F);
                this.offset += 2;
            }
            else if (value <= 1048575) {
                this.payload.push((value & 0x3F) | 0x80);
                this.payload.push(((value >> 6) & 0x7F) | 0x80);
                this.payload.push((value >> 13) & 0x7F);
                this.offset += 3;
            }
            else if (value <= 134217727) {
                this.payload.push((value & 0x3F) | 0x80);
                this.payload.push(((value >> 6) & 0x7F) | 0x80);
                this.payload.push(((value >> 13) & 0x7F) | 0x80);
                this.payload.push((value >> 20) & 0x7F);
                this.offset += 4;
            }
            else {
                this.payload.push((value & 0x3F) | 0x80);
                this.payload.push(((value >> 6) & 0x7F) | 0x80);
                this.payload.push(((value >> 13) & 0x7F) | 0x80);
                this.payload.push(((value >> 20) & 0x7F) | 0x80);
                this.payload.push((value >> 27) & 0xF);
                this.offset += 5;
            }
        }
    }

    writeVlong(high: number, low: number) {
        //console.log("writeVlong: high:", high, "low:", low);
        this.bitoffset = 0;
        this.writeVint(high);
        this.writeVint(low);
    }

    writeBoolean(value: boolean) {
        //console.log("writeBoolean:", value);
        if (this.bitoffset == 0) {
            this.payload.push(0)
            this.offset++
        }

        if (value) {
            this.payload[this.offset - 1] |= 1 << (this.bitoffset & 7);
        }

        this.bitoffset = (this.bitoffset + 1) & 7;
    }

    writeDataReference(high: number, low: number) {
        //console.log("writeDataReference: high:", high, "low:", low);
        this.bitoffset = 0;
        this.writeVint(high);
        if (high != 0)
            this.writeVint(low);
    }
}