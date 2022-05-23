import { IAuthComp } from '../components/ApiContent/ApiDetail/RequestInfo/AuthComp';
import { IBodyComp } from '../components/ApiContent/ApiDetail/RequestInfo/BodyComp';

export interface IApiContentContextProps {
  apiData?: any;
  url?: string;
  httpMethod?: string;
  parameters?: any[];
  authorization?: IAuthComp;
  bodyData?: IBodyComp;
  reqHeaders?: any[];
  resData?: any;
  handleApiData?: Function;
  handleUrl?: Function;
  handleHttpMethod?: Function;
  handleParameters?: Function;
  handleAuthorization?: Function;
  handleBodyData?: Function;
  handleReqHeaders?: Function;
  getFile?: Function;
  handleResData?: Function;
}
