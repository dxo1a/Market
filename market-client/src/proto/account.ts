// @generated by protobuf-ts 2.9.4 with parameter long_type_string
// @generated from protobuf file "account.proto" (package "account", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message account.EmptyRequest
 */
export interface EmptyRequest {
}
/**
 * @generated from protobuf message account.GetProfileResponse
 */
export interface GetProfileResponse {
    /**
     * @generated from protobuf field: string first_name = 1;
     */
    firstName: string;
    /**
     * @generated from protobuf field: string last_name = 2;
     */
    lastName: string;
    /**
     * @generated from protobuf field: string email = 3;
     */
    email: string;
    /**
     * @generated from protobuf field: string username = 4;
     */
    username: string;
    /**
     * @generated from protobuf field: string phone = 5;
     */
    phone: string;
    /**
     * @generated from protobuf field: string address = 6;
     */
    address: string;
}
/**
 * @generated from protobuf message account.UpdateProfileRequest
 */
export interface UpdateProfileRequest {
    /**
     * @generated from protobuf field: string first_name = 1;
     */
    firstName: string;
    /**
     * @generated from protobuf field: string last_name = 2;
     */
    lastName: string;
    /**
     * @generated from protobuf field: string email = 3;
     */
    email: string;
    /**
     * @generated from protobuf field: string username = 4;
     */
    username: string;
    /**
     * @generated from protobuf field: string phone = 5;
     */
    phone: string;
    /**
     * @generated from protobuf field: string address = 6;
     */
    address: string;
}
/**
 * @generated from protobuf message account.UpdateProfileResponse
 */
export interface UpdateProfileResponse {
    /**
     * @generated from protobuf field: string message = 1;
     */
    message: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class EmptyRequest$Type extends MessageType<EmptyRequest> {
    constructor() {
        super("account.EmptyRequest", []);
    }
    create(value?: PartialMessage<EmptyRequest>): EmptyRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<EmptyRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: EmptyRequest): EmptyRequest {
        return target ?? this.create();
    }
    internalBinaryWrite(message: EmptyRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message account.EmptyRequest
 */
export const EmptyRequest = new EmptyRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetProfileResponse$Type extends MessageType<GetProfileResponse> {
    constructor() {
        super("account.GetProfileResponse", [
            { no: 1, name: "first_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "last_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "phone", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GetProfileResponse>): GetProfileResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.firstName = "";
        message.lastName = "";
        message.email = "";
        message.username = "";
        message.phone = "";
        message.address = "";
        if (value !== undefined)
            reflectionMergePartial<GetProfileResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetProfileResponse): GetProfileResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string first_name */ 1:
                    message.firstName = reader.string();
                    break;
                case /* string last_name */ 2:
                    message.lastName = reader.string();
                    break;
                case /* string email */ 3:
                    message.email = reader.string();
                    break;
                case /* string username */ 4:
                    message.username = reader.string();
                    break;
                case /* string phone */ 5:
                    message.phone = reader.string();
                    break;
                case /* string address */ 6:
                    message.address = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetProfileResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string first_name = 1; */
        if (message.firstName !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.firstName);
        /* string last_name = 2; */
        if (message.lastName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.lastName);
        /* string email = 3; */
        if (message.email !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.email);
        /* string username = 4; */
        if (message.username !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.username);
        /* string phone = 5; */
        if (message.phone !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.phone);
        /* string address = 6; */
        if (message.address !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.address);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message account.GetProfileResponse
 */
export const GetProfileResponse = new GetProfileResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProfileRequest$Type extends MessageType<UpdateProfileRequest> {
    constructor() {
        super("account.UpdateProfileRequest", [
            { no: 1, name: "first_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "last_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "phone", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<UpdateProfileRequest>): UpdateProfileRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.firstName = "";
        message.lastName = "";
        message.email = "";
        message.username = "";
        message.phone = "";
        message.address = "";
        if (value !== undefined)
            reflectionMergePartial<UpdateProfileRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateProfileRequest): UpdateProfileRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string first_name */ 1:
                    message.firstName = reader.string();
                    break;
                case /* string last_name */ 2:
                    message.lastName = reader.string();
                    break;
                case /* string email */ 3:
                    message.email = reader.string();
                    break;
                case /* string username */ 4:
                    message.username = reader.string();
                    break;
                case /* string phone */ 5:
                    message.phone = reader.string();
                    break;
                case /* string address */ 6:
                    message.address = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpdateProfileRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string first_name = 1; */
        if (message.firstName !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.firstName);
        /* string last_name = 2; */
        if (message.lastName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.lastName);
        /* string email = 3; */
        if (message.email !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.email);
        /* string username = 4; */
        if (message.username !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.username);
        /* string phone = 5; */
        if (message.phone !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.phone);
        /* string address = 6; */
        if (message.address !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.address);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message account.UpdateProfileRequest
 */
export const UpdateProfileRequest = new UpdateProfileRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProfileResponse$Type extends MessageType<UpdateProfileResponse> {
    constructor() {
        super("account.UpdateProfileResponse", [
            { no: 1, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<UpdateProfileResponse>): UpdateProfileResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.message = "";
        if (value !== undefined)
            reflectionMergePartial<UpdateProfileResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UpdateProfileResponse): UpdateProfileResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string message */ 1:
                    message.message = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: UpdateProfileResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string message = 1; */
        if (message.message !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.message);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message account.UpdateProfileResponse
 */
export const UpdateProfileResponse = new UpdateProfileResponse$Type();
/**
 * @generated ServiceType for protobuf service account.AccountService
 */
export const AccountService = new ServiceType("account.AccountService", [
    { name: "GetProfile", options: {}, I: EmptyRequest, O: GetProfileResponse },
    { name: "UpdateProfile", options: {}, I: UpdateProfileRequest, O: UpdateProfileResponse }
]);
