// @generated by protobuf-ts 2.9.4 with parameter long_type_string
// @generated from protobuf file "auth.proto" (package "auth", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message auth.RegisterRequest
 */
export interface RegisterRequest {
    /**
     * @generated from protobuf field: string email = 1;
     */
    email: string;
    /**
     * @generated from protobuf field: string username = 2;
     */
    username: string;
    /**
     * @generated from protobuf field: string password = 3;
     */
    password: string;
}
/**
 * @generated from protobuf message auth.RegisterResponse
 */
export interface RegisterResponse {
    /**
     * @generated from protobuf field: string message = 1;
     */
    message: string;
}
/**
 * @generated from protobuf message auth.LoginRequest
 */
export interface LoginRequest {
    /**
     * @generated from protobuf field: string email = 1;
     */
    email: string;
    /**
     * @generated from protobuf field: string username = 2;
     */
    username: string;
    /**
     * @generated from protobuf field: string password = 3;
     */
    password: string;
}
/**
 * @generated from protobuf message auth.LoginResponse
 */
export interface LoginResponse {
    /**
     * @generated from protobuf field: string token = 1;
     */
    token: string;
}
/**
 * @generated from protobuf message auth.LogoutRequest
 */
export interface LogoutRequest {
    /**
     * @generated from protobuf field: string token = 1;
     */
    token: string;
}
/**
 * @generated from protobuf message auth.LogoutResponse
 */
export interface LogoutResponse {
    /**
     * @generated from protobuf field: string message = 1;
     */
    message: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class RegisterRequest$Type extends MessageType<RegisterRequest> {
    constructor() {
        super("auth.RegisterRequest", [
            { no: 1, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<RegisterRequest>): RegisterRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        message.username = "";
        message.password = "";
        if (value !== undefined)
            reflectionMergePartial<RegisterRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RegisterRequest): RegisterRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string email */ 1:
                    message.email = reader.string();
                    break;
                case /* string username */ 2:
                    message.username = reader.string();
                    break;
                case /* string password */ 3:
                    message.password = reader.string();
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
    internalBinaryWrite(message: RegisterRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string email = 1; */
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        /* string username = 2; */
        if (message.username !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.username);
        /* string password = 3; */
        if (message.password !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.password);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message auth.RegisterRequest
 */
export const RegisterRequest = new RegisterRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class RegisterResponse$Type extends MessageType<RegisterResponse> {
    constructor() {
        super("auth.RegisterResponse", [
            { no: 1, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<RegisterResponse>): RegisterResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.message = "";
        if (value !== undefined)
            reflectionMergePartial<RegisterResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RegisterResponse): RegisterResponse {
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
    internalBinaryWrite(message: RegisterResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
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
 * @generated MessageType for protobuf message auth.RegisterResponse
 */
export const RegisterResponse = new RegisterResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LoginRequest$Type extends MessageType<LoginRequest> {
    constructor() {
        super("auth.LoginRequest", [
            { no: 1, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<LoginRequest>): LoginRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        message.username = "";
        message.password = "";
        if (value !== undefined)
            reflectionMergePartial<LoginRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LoginRequest): LoginRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string email */ 1:
                    message.email = reader.string();
                    break;
                case /* string username */ 2:
                    message.username = reader.string();
                    break;
                case /* string password */ 3:
                    message.password = reader.string();
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
    internalBinaryWrite(message: LoginRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string email = 1; */
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        /* string username = 2; */
        if (message.username !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.username);
        /* string password = 3; */
        if (message.password !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.password);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message auth.LoginRequest
 */
export const LoginRequest = new LoginRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LoginResponse$Type extends MessageType<LoginResponse> {
    constructor() {
        super("auth.LoginResponse", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<LoginResponse>): LoginResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.token = "";
        if (value !== undefined)
            reflectionMergePartial<LoginResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LoginResponse): LoginResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string token */ 1:
                    message.token = reader.string();
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
    internalBinaryWrite(message: LoginResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string token = 1; */
        if (message.token !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.token);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message auth.LoginResponse
 */
export const LoginResponse = new LoginResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LogoutRequest$Type extends MessageType<LogoutRequest> {
    constructor() {
        super("auth.LogoutRequest", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<LogoutRequest>): LogoutRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.token = "";
        if (value !== undefined)
            reflectionMergePartial<LogoutRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LogoutRequest): LogoutRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string token */ 1:
                    message.token = reader.string();
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
    internalBinaryWrite(message: LogoutRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string token = 1; */
        if (message.token !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.token);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message auth.LogoutRequest
 */
export const LogoutRequest = new LogoutRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class LogoutResponse$Type extends MessageType<LogoutResponse> {
    constructor() {
        super("auth.LogoutResponse", [
            { no: 1, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<LogoutResponse>): LogoutResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.message = "";
        if (value !== undefined)
            reflectionMergePartial<LogoutResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LogoutResponse): LogoutResponse {
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
    internalBinaryWrite(message: LogoutResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
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
 * @generated MessageType for protobuf message auth.LogoutResponse
 */
export const LogoutResponse = new LogoutResponse$Type();
/**
 * @generated ServiceType for protobuf service auth.AuthService
 */
export const AuthService = new ServiceType("auth.AuthService", [
    { name: "Register", options: {}, I: RegisterRequest, O: RegisterResponse },
    { name: "Login", options: {}, I: LoginRequest, O: LoginResponse },
    { name: "Logout", options: {}, I: LogoutRequest, O: LogoutResponse }
]);
