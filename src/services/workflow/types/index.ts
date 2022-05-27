import { LargeNumberLike } from "crypto";

export interface IEvent {
    event_code: number;
    message: string;
    data: any;
    // data: Object | null;
}

export enum FlowCatagory {
    NONE,
    API,
    RULE,
    CHECK,
    ACTION,
    DELAY,
    MERGE,
    SPLIT,
    STOP,
    START
}

enum FieldSourceType {
    API,
    INPUTDATA,
    RULE
}

enum ComparisonCategory {
    STRING,
    NUMBERIC,
    BOOLEAN,
    DATE
}

enum ComparisonOprType {
    EQUALS,
    NOTEQUALS,
    CONTAINS,
    NOCONTAINS,
    BETWEEN
}

enum NextJsonType {
    NONE,
    AND,
    OR
}

export interface IRequestItem {
    displaySeq: string;
    fieldId: string;
    fieldName: string;
    fieldSourceType: FieldSourceType;
    fieldSourceValue: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;
}

export interface IResponseItem {
    displaySeq: number;
    fieldId: string;
    fieldName: string;
    fieldSourceType: FieldSourceType;
    fieldSourceValue: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;
}

export interface IInputDataItem {
    displaySeq: number;
    fieldId: string;
    fieldName: string;
    fieldSourceName: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;
}

export interface IOutputDataItem {
    displaySeq: number;
    fieldId: string;
    fieldName: string;
    fieldSourceValuePath: string;
}

export interface IRulesDetails {
    ruleId: string;
    ruleName: string;
    requestData: Array<IInputDataItem>;
    outputData: Array<IOutputDataItem>;
    parentFlowId: string;
    childFlowId: string;
}

export interface IApiDetail {
    apiId: string;
    apiName: string;
    successHttpCodes: Array<string>;
    faliureHttpCodes: Array<string>;
    requestData: Array<IRequestItem>
    outputData: Array<IResponseItem>
}

export interface ILeftSide {
    fieldId: string;
    fieldName: string;
    fieldSourceType: FieldSourceType;
    fieldSourceValue: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;
}

export interface IRightSide {
    displaySeq: number;
    fieldId: string;
    fieldName: string;
    fieldSourceType: FieldSourceType;
    fieldSourceValue: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;
    dynamicStatic: string;
}

export interface IConditionPairs {
    displaySeq: string;
    leftSide: ILeftSide;
    comparisonCategory: ComparisonCategory;
    comparisonOprType: ComparisonOprType
    rightSide: IRightSide;
    nextJoinType: NextJsonType;
}

export interface ISuccessActions {
    name: string;
    value: string;
}

export interface IFailedActions {
    name: string;
    value: string;
}

export interface ICheckCondition {
    checkConditionId: string;
    checkConditionName: string;
    conditionPairs: Array<IConditionPairs>;
    successActions: Array<ISuccessActions>;
    failedActions: Array<IFailedActions>
}

export interface IApiList {
    flowStepId:             string;
    flowItemCategory:       FlowCatagory;
    parentFlowItemId:       string;
    successChildFlowItemId: string;
    failureChildFlowItemId: string;
    apiDetails: IApiDetail[];
    rulesDetails: IRulesDetails;
    checkCondition: ICheckCondition;
}

export interface IEdge {
    id: string;
    source: string;
    target: string;
}