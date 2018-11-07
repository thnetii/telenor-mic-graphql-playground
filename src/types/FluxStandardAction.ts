import { Action } from 'redux';
import { FluxStandardAction as FSA, ErrorFluxStandardAction as ErrorFSA } from 'flux-standard-action';

export interface DefaultFluxStandardAction<Type extends string = string, Payload = undefined, Meta = undefined> extends FSA<Payload, Meta>, Action {
  type: Type;
}
export type DefaultFSA<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined
  > = DefaultFluxStandardAction<Type, Payload, Meta>;

interface DefaultFluxStandardActionWithPayload<Type extends string = string, Payload = undefined, Meta = undefined> extends DefaultFluxStandardAction<Type, Payload, Meta> {
  payload: Payload;
}
export type DefaultFSAWithPayload<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined
  > = DefaultFluxStandardActionWithPayload<Type, Payload, Meta>;

interface DefaultFluxStandardActionWithMeta<Type extends string = string, Payload = undefined, Meta = undefined> extends DefaultFluxStandardAction<Type, Payload, Meta> {
  meta: Meta;
}
export type DefaultFSAWithMeta<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined
  > = DefaultFluxStandardActionWithMeta<Type, Payload, Meta>;

export type DefaultFluxStandardActionWithPayloadAndMeta<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined
  > = DefaultFluxStandardActionWithPayload<Type, Payload, Meta> & DefaultFluxStandardActionWithMeta<Type, Payload, Meta>;
export type DefaultFSAWithPayloadAndMeta<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined
  > = DefaultFluxStandardActionWithPayloadAndMeta<Type, Payload, Meta>;

export type FluxStandardAction<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined
  > = Payload extends undefined
  ? (
    Meta extends undefined
    ? DefaultFluxStandardAction<Type, Payload, Meta>
    : DefaultFluxStandardActionWithMeta<Type, Payload, Meta>
  )
  : (
    Meta extends undefined
    ? DefaultFluxStandardActionWithPayload<Type, Payload, Meta>
    : DefaultFluxStandardActionWithPayloadAndMeta<Type, Payload, Meta>
  );
export type FSA<
  Type extends string = string,
  Payload = undefined,
  Meta = undefined
  > = FluxStandardAction<Type, Payload, Meta>;

export interface DefaultErrorFluxStandardAction<Type extends string = string, CustomError extends Error = Error, Meta = undefined> extends ErrorFSA<CustomError, Meta>, Action {
  type: Type;
}
export type DefaultErrorFSA<
  Type extends string = string,
  CustomError extends Error = Error,
  Meta = undefined
  > = DefaultErrorFluxStandardAction<Type, CustomError, Meta>;

interface DefaultErrorFluxStandardActionWithPayload<Type extends string = string, CustomError extends Error = Error, Meta = undefined> extends DefaultErrorFluxStandardAction<Type, CustomError, Meta> {
  payload: CustomError;
}
export type DefaultErrorFSAWithPayload<
  Type extends string = string,
  CustomError extends Error = Error,
  Meta = undefined
  > = DefaultErrorFluxStandardActionWithPayload<Type, CustomError, Meta>;

interface DefaultErrorFluxStandardActionWithMeta<Type extends string = string, CustomError extends Error = Error, Meta = undefined> extends DefaultErrorFluxStandardAction<Type, CustomError, Meta> {
  meta: Meta;
}
export type DefaultErrorFSAWithMeta<
  Type extends string = string,
  CustomError extends Error = Error,
  Meta = undefined
  > = DefaultErrorFluxStandardActionWithMeta<Type, CustomError, Meta>;

export type DefaultErrorFluxStandardActionWithPayloadAndMeta<
  Type extends string = string,
  CustomError extends Error = Error,
  Meta = undefined
  > = DefaultErrorFluxStandardActionWithPayload<Type, CustomError, Meta> & DefaultErrorFluxStandardActionWithMeta<Type, CustomError, Meta>;
export type DefaultErrorFSAWithPayloadAndMeta<
  Type extends string = string,
  CustomError extends Error = Error,
  Meta = undefined
  > = DefaultErrorFluxStandardActionWithPayloadAndMeta<Type, CustomError, Meta>;

export type ErrorFluxStandardAction<
  Type extends string = string,
  CustomError extends Error = Error,
  Meta = undefined
  > = CustomError extends undefined
  ? (
    Meta extends undefined
    ? DefaultErrorFluxStandardAction<Type, CustomError, Meta>
    : DefaultErrorFluxStandardActionWithMeta<Type, CustomError, Meta>
  )
  : (
    Meta extends undefined
    ? DefaultErrorFluxStandardActionWithPayload<Type, CustomError, Meta>
    : DefaultErrorFluxStandardActionWithPayloadAndMeta<Type, CustomError, Meta>
  );
export type ErrorFSA<
  Type extends string = string,
  CustomError extends Error = Error,
  Meta = undefined
  > = ErrorFluxStandardAction<Type, CustomError, Meta>;
