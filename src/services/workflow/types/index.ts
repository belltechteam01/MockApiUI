import { LargeNumberLike } from "crypto";
import { CWorkMap } from "../workmap";
import { CWorkNode } from "../workmap/worknode";
import { CWork } from "../workmodel/models/work";

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

export enum FieldSourceType {
    API,
    INPUTDATA,
    RULE
}

export enum ComparisonCategory {
    STRING,
    NUMBERIC,
    BOOLEAN,
    DATE
}

export enum ComparisonOprType {
    EQUALS,
    NOTEQUALS,
    CONTAINS,
    NOCONTAINS,
    BETWEEN
}

export enum NextJsonType {
    NONE,
    AND,
    OR
}

export enum ItemType {
    REQUEST,
    RESPONSE,
    RULE_INPUT,
    RULE_OUTPUT
};

export interface IRequestItem {
    displaySeq: string;
    fieldId: string;
    fieldName: string;
    fieldSourceType: string;
    fieldSourceValue: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;

    id: string;
    path: string;
    type: ItemType;
    parent: IApiDetail;
}

export interface IResponseItem {
    displaySeq: number;
    fieldId: string;
    fieldName: string;
    fieldSourceType: string;
    fieldSourceValue: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;

    id: string;
    path: string;
    type: ItemType;
    parent: IApiDetail;
}

export interface IInputDataItem {
    displaySeq: number;
    fieldId: string;
    fieldName: string;
    fieldSourceName: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;

    id: string;
    path: string;
    type: ItemType;
    parent: IRulesDetails;
}

export interface IOutputDataItem {
    displaySeq: number;
    fieldId: string;
    fieldName: string;
    fieldSourceValuePath: string;

    id: string;
    path: string;
    type: ItemType;
    parent: IRulesDetails;
}

export interface IRulesDetails {
    ruleId: string;
    ruleName: string;
    inputData: Array<IInputDataItem>;
    outputData: Array<IOutputDataItem>;
    parentFlowId: string;
    childFlowId: string;

    inputMap: Map<string, IInputDataItem>;
    outputMap: Map<string, IOutputDataItem>;
    parent: any;
}

export interface IStatusCode {
    id: string;
    code: string;
    action: string;
}

export interface IApiDetail {
    apiId: string;
    apiName: string;
    successHttpCodes: Array<string>;
    faliureHttpCodes: Array<string>;
    requestData: Array<IRequestItem>;
    outputData: Array<IResponseItem>;

    id: string;
    successCodeMap: Map<string, IStatusCode>;
    failCodeMap: Map<string, IStatusCode>;
    requestMap: Map<string, IRequestItem>;
    responseMap: Map<string, IResponseItem>
    parent: any;
}

export interface ILeftSide {
    fieldId: string;
    fieldName: string;
    fieldSourceType: string;
    fieldSourceValue: string;
    fieldSourceId: string;
    fieldSourceValuePath: string;
}

export interface IRightSide {
    displaySeq: number;
    fieldId: string;
    fieldName: string;
    fieldSourceType: string;
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

    id: string;
}

export interface ISuccessActions {
    name: string;
    value: string;

    id: string;
}

export interface IFailedActions {
    name: string;
    value: string;

    id: string;
}

export interface ICheckCondition {
    checkConditionId: string;
    checkConditionName: string;
    conditionPairs: Array<IConditionPairs>;
    successActions: Array<ISuccessActions>;
    failedActions: Array<IFailedActions>

    conditionPairMap: Map<string, IConditionPairs>;
    successActionMap: Map<string, ISuccessActions>;
    failedActionMap: Map<string, IFailedActions>;
}

export interface IFlowStep {
    flowStepId:             string;
    flowItemCategory:       FlowCatagory;
    parentFlowItemId:       string;
    successChildFlowItemId: string;
    failureChildFlowItemId: string;
    apiDetails: IApiDetail;
    rulesDetails: IRulesDetails;
    checkCondition: ICheckCondition;

    id: string;
    node: CWorkNode<CWork>;
}

export interface IFlow {
    flowId:     string;
    flowName:   string;
    flowSteps:  Array<IFlowStep>;

    flowStepMap: Map<string, IFlowStep>
}

export interface IEdge {
    id: string;
    source: string;
    target: string;
}

// Definition API List Types
export interface IApiList {
    Items: Array<IApiItem>;
    Count: number;
    ScannedCount: number;
}

export interface IApiItem {
    httpMethod: string;
    companyId: string;
    storeageInfo: IStoreageInfo;
    folderId: string;
    authenticationInfo: IAuthenticationInfo;
    apiHeaders: IApiHeaders;
    creationDate: string;
    apiName: string;
    needsAuthentication: boolean,
    apiUrl: string;
    apiId: string;
    httpGetPattern: string;
    dataElements: Map<string, IDataElement>;
    dataElementList: Array<IDataElement>;
}

interface IStoreageInfo {
    storeageDuration: string;
}

interface IAuthenticationInfo {
    callMethod: string;
    accessTokenName: string;
    clientId: IClientId;
    clientSecret: IClientSecret;
    authApiUrl: string,
    grantType: string,
    referenceKey: string;
}

interface IClientId {
    fieldValue: string;
    fieldName: string;
}

interface IClientSecret
{
    fieldValue: string;
    fieldName: string;
}

interface IApiHeaders {
    AUTHENTICATION: string;
    codeName: string;
    "Access-Control-Allow-Origin": string;
}

export interface IDataElement {
    attributeName: string;
    displaySequence: string;
}

