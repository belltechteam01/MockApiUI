import {CWork} from "./models/work"
import {CWorkAction} from "./models/action"
import {CWorkCallApi} from "./models/callapi"
import {CWorkCallRule} from "./models/callrule"
import {CWorkCheck} from "./models/check"
import {CWorkMerge} from "./models/merge"
import {CWorkSplit} from "./models/split"
import {CWorkStart} from "./models/start"
import {CWorkStop} from "./models/stop"
import {CWorkWait} from "./models/wait"
import { CParam, CRequest, CResponse } from "./params"
import { ParamSrcType} from './params'

export interface IApi {
    apiId: string;
    apiName: string;
    requestMap: Map<string, CRequest>;
    responseMap: Map<string, CResponse>;
    jsonData: string;
}

export interface IWork {
    id: string;
    name: string;
    api: IApi;
}

export {
    CWork,
    CWorkAction,
    CWorkCallApi,
    CWorkCallRule,
    CWorkCheck,
    CWorkMerge,
    CWorkSplit,
    CWorkStart,
    CWorkStop,
    CWorkWait,

    ParamSrcType,

    CParam,
    CRequest,
    CResponse,
};
