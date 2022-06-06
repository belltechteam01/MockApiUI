import React, { MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Drawer, FormControl, FormHelperText, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { FormControlContainer, Input, Label, ReactSelect, TextArea } from '../../../styled';
import BasicModal from '../../Based/BasicModal';
import Button from '../../Based/Button';
import styles from './styles.module.scss';
import { CWorkflow } from 'services/workflow';
import { CWork, IApi } from 'services/workflow/workmodel/models/work';
import * as Types from 'services/workflow/types';
import { EVENT_CODE } from 'services/workflow/events';

import { ModalType } from '../../Modals';
import * as RequestModal from 'components/Modals/RequestModal';
import * as ResponseModal from 'components/Modals/ResponseModal';
import * as StatusCodeModal from 'components/Modals/StatusCodeModal';
import * as TestDataModal from 'components/Modals/TestDataModal';
import { CParam } from 'services/workflow/workmodel/params';
import { ParamSrcType } from 'services/workflow/workmodel/params/param';

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

export interface ILocalState {
  modalType: ModalType;
  showModal: boolean;
  selectedApiId: string;
  nodeId: string;
  isModalEdit: boolean;
  selectedRequestId?: string;
  selectedResponseId?: string;
}

export const setStateMany = (fn: Function, d: Object) => {
  if (d && typeof d === 'object') {
    // console.log('[state] setMany', d);
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
          console.log(workData);
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
    const apiDetail = value as Types.IApiItem;

    apiList.push({
      value: id,
      label: apiDetail.apiName
    })
  })

  // console.log("[LOG] selected apiId", localState.selectedApiId);

  const apiDetail = CWorkflow.getInstance().getApiList().get(localState.selectedApiId);
  const initialValue = {
    value: apiDetail? apiDetail.apiId: "",
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
  work: CWork | undefined,
  localState:ILocalState,
  setLocalState: Function,
  t: Function
): ReactNode => 
{
  var ret: ReactNode;

  let requests_ui: any;
  const requests = work?.getRequests();
  
  if(requests) {
    const requests_value = [...requests.values()];
    requests_ui = requests_value.map((param) => {
      return {
        key: param.id, 
        fieldName: param.fieldName, 
        srcType: param.getValueType(),
        srcPath: param.getFieldSourceValuePath()
      };
    });
  }else
    requests_ui = [];

  // console.log("[LOG] getRequestsList", request.fieldSourceType);
  const d = { showModal: true, modalType: ModalType.Request, isModalEdit: false };
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
              {requests_ui.map((item) => (
                <TableRow
                  key={item.key}
                  onDoubleClick={() => setStateMany(setLocalState, { ...d, selectedRequestId: item.key, isModalEdit: true })}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.fieldName}
                  </TableCell>
                  <TableCell classes={{ root: styles.inputCell }}>
                    <span className={styles.smallText}>
                      {
                        (item.srcType == ParamSrcType.API) && 
                        t('workflow.setting.form.parameterTypes.API')
                        
                      }
                      {
                        (item.srcType == ParamSrcType.INPUTDATA) && 
                        t('workflow.setting.form.parameterTypes.INPUTDATA')
                      }
                      {
                        (item.srcType == ParamSrcType.RULE) && 
                        t('workflow.setting.form.parameterTypes.RULE')
                      }
                    </span>
                    <p>{item.srcPath}</p>
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
  work: CWork | undefined,
  localState:ILocalState,
  setLocalState: Function,
  t: Function
): ReactNode => 
{
  var ret: ReactNode;

  let responses_ui: any;
  const responses = work?.getResponses();
  
  if(responses) {
    const responses_value = [...responses.values()];
    responses_ui = responses_value.map((param) => {
      return {
        key: param.id, 
        fieldName: param.fieldName, 
        srcType: param.getValueType(),
        srcPath: param.getFieldSourceValuePath()
      };
    });
  }else
    responses_ui = [];

  const d = { showModal: true, modalType: ModalType.Response, isModalEdit: false};
  // setStateMany(setLocalState, d);
  ret = (
    <div className={styles.responseWrapper}>
      <FormControlContainer>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.responseData')}</div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow onDoubleClick={() => setStateMany(setLocalState, d)}>
                <TableCell>Field Name</TableCell>
                <TableCell>Json Path/Constant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {responses_ui.map((item) => (
                <TableRow
                  key={item.key}
                  onDoubleClick={() => setStateMany(setLocalState, {...d, selectedResponseId: item.key, isModalEdit: false })}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.fieldName}
                  </TableCell>
                  <TableCell classes={{ root: styles.inputCell }}>
                    <p>{item.srcPath}</p>
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
      { localState.showModal && localState.modalType == ModalType.Request && 
        <RequestModal.Modal 
          id="modal-1" 
          type={localState.modalType}
          data={localState} 
          onClose={onClose} 
        />
      }
      { localState.showModal && localState.modalType == ModalType.Response && 
        <ResponseModal.Modal 
          id="modal-2" 
          type={localState.modalType}
          data={localState} 
          onClose={onClose} 
        />
      }
      { localState.showModal && localState.modalType == ModalType.TestData && 
        <TestDataModal.Modal
          id="modal-4" 
          type={localState.modalType}
          data={localState} 
          onClose={onClose} 
        />
      }
      {/* { localState.showModal && localState.modalType == ModalType.StatusCode && 
        <StatusCodeModal.Modal id="modal-3" attribId={localState.selectedApiId} data={data} onClose={onClose} />
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
  const apiList = workflow.getApiList();

  //states

  const [api, setApi] = React.useState<IApi>();
  const [workData, setWorkData] = React.useState<CWork | undefined>(workNode?.getInstance());

  const [localState, setLocalState] = React.useState<ILocalState>({
    showModal: false,
    modalType: ModalType.Request,
    selectedApiId: workData?.getApiId() ?? "",
    nodeId: nodeId,
    isModalEdit: false
  });
  
  const onModalClose = () => {
    setStateMany(setLocalState, { showModal: false});
  };

  useEffect(() => {
    if(localState.selectedApiId != "") {
      setWorkData(workNode?.getInstance());
    }
    if(workData){
      setApi(workData.api);
    }
    // console.log("[LOG] local state", localState);
  }, [workData, localState]);

  const [stepName, setStepName] = React.useState<string>(workNode?.getName() ?? "untitled");

  const onSelect = (apiId: string) => {
    workflow?.selectApi(apiId, nodeId);
    // console.log("[LOG] setting props apiList - id: " + apiId, workNode?.getInstance());
    setWorkData(workNode?.getInstance());
    setStateMany(setLocalState, {selectedApiId: apiId});
  }

  const onTestData = () => {
    const d = { showModal: true, modalType: ModalType.TestData, isModalEdit: false};
    setStateMany(setLocalState, d);
  }

  const apiNameEditor = getApiNameEditor(stepName, workData, t);
  const apiSelector = getApiSelector(apiList, localState, onSelect, t);

  const reqeustList = getReqeuestList(workData, localState, setLocalState, t);
  const responseList = getResponseList(workData, localState, setLocalState, t);

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
          <Button variant="contained" text="Test" classes={{ root: styles.btnSave }} disabled={false} onClick={() => onTestData()} />
          <Button text="Cancel" variant="outlined" classes={{ root: styles.btnCancel }} onClick={onDrawerClose} />
        </div>
      </Container>
    </>
  );
};

export default SettingPane;
