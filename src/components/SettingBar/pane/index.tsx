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
  workflow: CWorkflow | undefined;
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
  selectedId: string;
  flowStepId: string;
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

const getApiSelector = (flowSteps: Array<Types.IFlowStep> | undefined, t: Function, onSelect: Function): ReactNode => {
  var ret: ReactNode;
  if(flowSteps == undefined) flowSteps = [];
  
  // console.log("[LOG] getApiSelector", flowSteps);
  let apiList = flowSteps.map((flowStep) => {
    return {value: flowStep.apiDetails.id, label: flowStep.apiDetails.apiName};
  })

  ret = (
    <>
      <FormControlContainer>
        <FormControl fullWidth variant="standard">
          <ReactSelect
            id="api-selector"
            aria-describedby="action-helper-text"
            placeholder={t('workflow.setting.form.placeholder.api-selector')}
            // defaultValue={}
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

const getReqeuestList = (requests: Array<Types.IRequestItem> | undefined, t: Function, showModal: Function): ReactNode => {
  var ret: ReactNode;
  if(!Array.isArray(requests)) requests = [];
  // console.log("[LOG] getRequestsList", request.fieldSourceType);
  const d = { showModal: true, modalType: ModalType.Request, selectedId: "" };
  ret = (
    <div className={styles.requestWrapper}>
      <FormControlContainer>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.requestData')}</div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow onClick={() => setStateMany(showModal, d)}>
                <TableCell>Field Name</TableCell>
                <TableCell>Json Path/Constant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(requests || []).map((request: Types.IRequestItem, index) => (
                <TableRow
                  key={request.id}
                  onClick={() => setStateMany(showModal, { ...d, selectedId: request.id })}
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

const getResponseList = (responses: Array<Types.IResponseItem> | undefined, t: Function, showModal: Function): ReactNode => {
  var ret: ReactNode;
  const d = { showModal: true, modalType: ModalType.Response, selectedId: "" };
  if(!Array.isArray(responses)) responses = [];
  ret = (
    <div className={styles.responseWrapper}>
      <FormControlContainer>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.responseData')}</div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow onClick={() => setStateMany(showModal, d)}>
                <TableCell>Field Name</TableCell>
                <TableCell>Json Path/Constant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(responses || []).map((response: Types.IResponseItem, index) => (
                <TableRow
                  key={response.id}
                  onClick={() => setStateMany(showModal, { ...d, selectedId: response.id })}
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
          onClick={() => setStateMany(showModal, { ...d, modalType: ModalType.StatusCode })}
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
      { localState.showModal && localState.modalType == ModalType.Request && 
        <RequestModal.Modal id="modal-1" flowStepId={localState.flowStepId} selectedId={localState.selectedId} data={data} onClose={onClose} />
      }
      { localState.showModal && localState.modalType == ModalType.Response && 
        <ResponseModal.Modal id="modal-2" flowStepId={localState.flowStepId} selectedId={localState.selectedId} data={data} onClose={onClose} />
      }
      { localState.showModal && localState.modalType == ModalType.StatusCode && 
        <StatusCodeModal.Modal id="modal-3" flowStepId={localState.flowStepId} selectedId={localState.selectedId} data={data} onClose={onClose} />
      }
    </>
  );
  return ret;
};

const setApiDetails = () => {
  // console.log("[LOG] fill api list");
}

const SettingPane = (props: ISettingPaneProps) => {
  const {
    onDrawerClose,
    onSave,
    properties,

    nodeId,
    workflow
  } = props;
  
  const { t } = useTranslation();
  //props

  const workNode = workflow?.worklist.get(nodeId);
  const workData = workNode?.getInstance();
  const apiList = workflow?.getApiList(true);
  console.log("[LOG] apiList", apiList);

  //states
  const [localState, setLocalState] = React.useState<ILocalState>({
    showModal: false,
    modalType: ModalType.Request,
    selectedId: "",
    flowStepId: ""
  });

  const onModalClose = () => {
    setStateMany(setLocalState, { showModal: false, selectedId: "" });
  };

  useEffect(() => {
    // console.log('[LOG] changed local state', localState);
  }, [localState]);

  const [addFormData, setAddFormData] = React.useState<any>(properties || {});

  const [flowSteps, setFlowSteps] = React.useState<Types.IFlowStep[]>();
  const [requests, setRequests] = React.useState<Types.IRequestItem[]>();
  const [responses, setResponses] = React.useState<Types.IResponseItem[]>();
  const [apiName, setApiName] = React.useState<string>(workData ? workData.name : 'untitled');


  const onSelect = (apiId: string) => {

    console.log("[LOG] before", workflow);

    workflow?.selectApi(apiId, nodeId);

    console.log("[LOG] after", workflow);
  }

  const apiNameEditor = getApiNameEditor(apiName, workData, t);
  const apiSelector = getApiSelector(flowSteps, t, onSelect);
  const reqeustList = getReqeuestList(requests, t, setLocalState);
  const responseList = getResponseList(responses, t, setLocalState);

  useEffect(() => {
    if(workflow) {
      let flowData = workflow.getFlowData();
      if(flowData && flowData.flowSteps) {
          setFlowSteps(flowData.flowSteps);
      };
    }
  }, [workflow]);

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
