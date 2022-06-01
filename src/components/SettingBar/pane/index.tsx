import React, { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Drawer, FormControl, FormHelperText, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { FormControlContainer, Input, Label, ReactSelect, TextArea } from '../../../styled';
import BasicModal from '../../Based/BasicModal';
import Button from '../../Based/Button';
import styles from './styles.module.scss';
import { CWorkflow } from 'services/workflow';
import { CWork } from 'services/workflow/workmodel/models/work';
import * as Types from 'services/workflow/types';
import { EVENT_CODE } from 'services/workflow/events';

import { ModalType } from '../../Modals';
import * as RequestModal from 'components/Modals/RequestModal';
import * as ResponseModal from 'components/Modals/ResponseModal';
import * as StatusCodeModal from 'components/Modals/StatusCodeModal';

export interface ISettingPaneProps extends ISettingPaneEvent {
  nodeId: string;
  selectList?: any[];
  properties?: any;
}

export interface ISettingPaneEvent {
  onSave: Function;
  onDrawerClose?: (event: React.KeyboardEvent | React.MouseEvent, isOpen: boolean) => void;
  onSelectAPI?: Function;
}

interface ILocalState {
  modalType: ModalType;
  showModal: boolean;
  selectedApiId: string;
}

export const setStateMany = (fn: Function, d: Object) => {
  if (d && typeof d === 'object') {
    console.log('[state] setMany', d);
    fn((p) => ({ ...p, ...d }));
  }
};

//functions
const getApiNameEditor = (apiName: string, workData: CWork | undefined, t: Function): ReactNode => {
  const node = useRef<HTMLInputElement>(null);
  let ret: ReactNode = (
    <div className={styles.inputTextWrapper}>
      <div>{t('workflow.setting.form.label.apiname')}</div>
      <Input
        className={styles.inputText}
        id="name"
        ref={node}
        aria-describedby="stepName-helper-text"
        placeholder={t('workflow.setting.form.placeholder.name')}
        onBlur={(e) => {
          workData?.changeNodeName(e.target.value);
        }}
      />
    </div>
  );
  node?.current?.setAttribute('value', apiName);
  return ret;
};

const getApiSelector = (
  lstApi: Map<string, any>, 
  localState:ILocalState,
  onSelect: Function,
  t: Function
): ReactNode => 
{
  var ret: ReactNode;

  let apiList: any = [];
  lstApi.forEach((value, id) => {
    const apiDetail = value as Types.IApiDetail;

    apiList.push({
      value: id,
      label: apiDetail.apiName
    })
  })

  console.log("[LOG] selected apiId", localState.selectedApiId);
  
  const apiDetail = CWorkflow.getInstance().getSApiList().get(localState.selectedApiId);
  const initialValue = {
    value: apiDetail? apiDetail.id: "",
    label: apiDetail? apiDetail.apiName: ""
  };

  ret = (
    <>
      <FormControlContainer>
        <FormControl fullWidth variant="standard">
          <ReactSelect
            id="api-selector"
            aria-describedby="action-helper-text"
            placeholder={t('workflow.setting.form.placeholder.api-selector')}
            defaultValue={initialValue}
            options={apiList}
            onChange={(e:any) => onSelect(e.value)}
            styles={{
              menuPortal: (provided) => ({
                ...provided,
                zIndex: 1001
              }),
              menu: (provided) => ({ ...provided, zIndex: 1001 })
            }}
          />
        </FormControl>
      </FormControlContainer>
    </>
  );

  return ret;
};

const getReqeuestList = (
  apiDetail: any,
  localState:ILocalState,
  setLocalState: Function,
  t: Function
): ReactNode => 
{
  var ret: ReactNode;

  let requests: any = [];
  requests = apiDetail?.requestData;

  if(!Array.isArray(requests)) requests = [];
  // console.log("[LOG] getRequestsList", request.fieldSourceType);
  const d = { showModal: true, modalType: ModalType.Request, selectedApiId: "" };
  ret = (
    <div className={styles.requestWrapper}>
      <FormControlContainer>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.requestData')}</div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow onDoubleClick={() => setStateMany(setLocalState, d)}>
                <TableCell>Field Name</TableCell>
                <TableCell>Json Path/Constant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(requests || []).map((request: Types.IRequestItem, index) => (
                <TableRow
                  key={request.id}
                  onDoubleClick={() => setStateMany(setLocalState, { ...d, selectedApiId: request.id })}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {request.fieldName}
                  </TableCell>
                  <TableCell classes={{ root: styles.inputCell }}>
                    <span className={styles.smallText}>
                      {
                        (request.fieldSourceType == Types.FieldSourceType[Types.FieldSourceType.API]) && 
                        t('workflow.setting.form.parameterTypes.API')
                        
                      }
                      {
                        request.fieldSourceType == Types.FieldSourceType[Types.FieldSourceType.INPUTDATA] && 
                        t('workflow.setting.form.parameterTypes.INPUTDATA')
                      }
                      {
                        request.fieldSourceType == Types.FieldSourceType[Types.FieldSourceType.RULE] && 
                        t('workflow.setting.form.parameterTypes.RULE')
                      }
                    </span>
                    <p>{request.fieldSourceValuePath}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FormControlContainer>
    </div>
  );
  return ret;
};

const getResponseList = (
  apiDetail: any,
  localState:ILocalState,
  setLocalState: Function,
  t: Function
): ReactNode => {

  var ret: ReactNode;
  const d = { showModal: true, modalType: ModalType.Response, selectedApiId: "" };
  var ret: ReactNode;

  let responses: any = [];
  responses = apiDetail?.outputData;

  if(!Array.isArray(responses)) responses = [];
  
  ret = (
    <div className={styles.responseWrapper}>
      <FormControlContainer>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.responseData')}</div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow onClick={() => setStateMany(setLocalState, d)}>
                <TableCell>Field Name</TableCell>
                <TableCell>Json Path/Constant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(responses || []).map((response: Types.IResponseItem, index) => (
                <TableRow
                  key={response.id}
                  onClick={() => setStateMany(setLocalState, { ...d, selectedApiId: response.id })}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {response.fieldName}
                  </TableCell>
                  <TableCell classes={{ root: styles.inputCell }}>
                    <p>{response.fieldSourceValuePath}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          text={t('workflow.setting.form.label.resSuccessBtn')}
          classes={{ root: styles.resSuccessBtn }}
          clean
          onClick={() => setStateMany(setLocalState, { ...d, modalType: ModalType.StatusCode })}
        />
      </FormControlContainer>
    </div>
  );
  return ret;
};

const getModal = (localState: ILocalState, data: any, onClose: Function): ReactNode => {
  let ret: ReactNode;
  ret = (
    <>
      {/* { localState.showModal && localState.modalType == ModalType.Request && 
        <RequestModal.Modal id="modal-1" selectedId={localState.selectedApiId} data={data} onClose={onClose} />
      }
      { localState.showModal && localState.modalType == ModalType.Response && 
        <ResponseModal.Modal id="modal-2" selectedId={localState.selectedApiId} data={data} onClose={onClose} />
      }
      { localState.showModal && localState.modalType == ModalType.StatusCode && 
        <StatusCodeModal.Modal id="modal-3" selectedId={localState.selectedApiId} data={data} onClose={onClose} />
      } */}
    </>
  );
  return ret;
};

const SettingPane = (props: ISettingPaneProps) => {
  const {
    onDrawerClose,
    onSave,
    properties,
    nodeId
  } = props;
  
  const { t } = useTranslation();
  //props
  const workflow = CWorkflow.getInstance();
  const workNode = workflow.worklist.get(nodeId);
  const apiList = workflow.getApiList(true);
  const apiId = workNode?.getInstance().api.apiId;

  //states
  const [localState, setLocalState] = React.useState<ILocalState>({
    showModal: false,
    modalType: ModalType.Request,
    selectedApiId: apiId ?? "",
  });
  const [apiDetail, setApiDetail] = React.useState<Types.IApiDetail>();
  const [workData, setWorkData] = React.useState<CWork | undefined>(undefined);
  
  const onModalClose = () => {
    setStateMany(setLocalState, { showModal: false, selectedApiId: "" });
  };

  // useEffect(() => {
  //   if(localState.selectedApiId != "") {
  //     setWorkData(workNode?.getInstance());
  //   }
  // }, [localState]);

  useEffect(() => {
    if(localState.selectedApiId != "") {
      setWorkData(workNode?.getInstance());
    }
    if(workData){
      setApiDetail(workData.api);
      setApiName(workData.name);
    }
    console.log("[LOG] local state", localState);
  }, [workData, localState]);

  const [apiName, setApiName] = React.useState<string>('untitled');

  const onSelect = (apiId: string) => {
    workflow?.selectApi(apiId, nodeId);
    setWorkData(workNode?.getInstance());
  }

  const apiNameEditor = getApiNameEditor(apiName, workData, t);
  const apiSelector = getApiSelector(apiList, localState, onSelect, t);
  const reqeustList = getReqeuestList(apiDetail, localState, setLocalState, t);
  const responseList = getResponseList(apiDetail, localState, setLocalState, t);

  return (
    <>
      <Container className={styles.subContainer}>
        {/* apiSelector */}
        {apiNameEditor}
        {apiSelector}
        {/* requests editor */}
        {reqeustList}
        {/* response editor */}
        {responseList}

        {/* modal */}
        {getModal(localState, workflow, onModalClose)}

        {/* button group */}
        <div className={styles.btnWrapper}>
          <Button variant="contained" text="Save" classes={{ root: styles.btnSave }} disabled={false} onClick={() => onSave()} />
          <Button text="Cancel" variant="outlined" classes={{ root: styles.btnCancel }} onClick={onDrawerClose} />
        </div>
      </Container>
    </>
  );
};

export default SettingPane;
