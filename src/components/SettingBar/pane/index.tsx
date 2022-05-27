import React, { MouseEventHandler, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Drawer, FormControl, FormHelperText, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { FormControlContainer, Input, Label, ReactSelect, TextArea } from '../../../styled';
import BasicModal from '../../Based/BasicModal';
import Button from '../../Based/Button';
import styles from './styles.module.scss';
import { FROM_API_DATA, FROM_INPUT_DATA } from 'utils/constant';
import { CWorkflow } from 'services/workflow';
import { CWork } from 'services/workflow/workmodel/models/work';
import { IApiDetail, IRequestItem, IResponseItem } from 'services/workflow/types';

export interface ISettingPaneProps extends ISettingPaneEvent {
  nodeId: string;
  workflow: CWorkflow;
  selectList?: any[];
  properties?: any;
}

export interface ISettingPaneEvent {
  onSaveParent?: Function;
  onDrawerClose?: (event: React.KeyboardEvent | React.MouseEvent, isOpen: boolean) => void;
  onSelectAPI?: Function;
}

const initAction = '';
const initActionName = '';
const initTestStepData = '';
const actionOption = [
  {
    label: 'API',
    value: 'api'
  },
  {
    label: 'Rule',
    value: 'rule'
  }
];

//functions
const getApiNameEditor = (workData: CWork | undefined, t: Function): ReactNode => {
  return <>
    {/* apiSelector */}
    <FormControlContainer>
      <FormControl fullWidth>
        <Label htmlFor="name">{t('workflow.setting.form.label.name')}</Label>
        <Input
          id="name"
          aria-describedby="stepName-helper-text"
          placeholder={t('workflow.setting.form.placeholder.name')}
          value={workData?.name}
          onChange={(e) => {
            console.log("[LOG] api name changed ", e.target.value);
          }}
        />
      </FormControl>
    </FormControlContainer>
  </>
}

const getApiSelector = (apiList: Array<IApiDetail> | undefined, t: Function) : ReactNode => {
  var ret: ReactNode;

  ret = <>
    <FormControlContainer>
      <FormControl fullWidth variant="standard">
        <ReactSelect
          id="api-selector"
          aria-describedby="action-helper-text"
          placeholder={t('workflow.setting.form.placeholder.api-selector')}
          defaultValue={initAction}
          options={apiList}
          onChange={(value: any) => {
            // if (onSelectAPI) onSelectAPI(newValue.value);
            console.log("[LOG] api selected changing", value);
          }}
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

  return ret;
}

const setIsModalOpen = (isOpen: boolean) => {
    
}

const getReqeuestList = (requests: Array<IRequestItem> | undefined, t: Function) : ReactNode => {
  var ret: ReactNode;
  ret = 
    <div className={styles.requestWrapper}>
      <FormControlContainer>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.requestData')}</div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Field Name</TableCell>
                <TableCell>Json Path/Constant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(requests || []).map((element: any, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {element.fieldName}
                  </TableCell>
                  <TableCell classes={{ root: styles.inputCell }} onClick={(e: any) => setIsModalOpen(true)}>
                    <span className={styles.smallText}>{element.isConstant ? FROM_INPUT_DATA : FROM_API_DATA}</span>
                    <p>{element?.path}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FormControlContainer>
    </div>
  return ret;
}

const getResponseList = (responses: Array<IResponseItem> | undefined, t: Function) : ReactNode => {
  var ret: ReactNode;

  ret = 
    <div className={styles.responseWrapper}>
      <FormControlContainer>
        <div className={styles.borderLabel}>{t('workflow.setting.form.label.responseData')}</div>
      </FormControlContainer>
      <Button text={t('workflow.setting.form.label.resSuccessBtn')} classes={{ root: styles.resSuccessBtn }} clean />
      <div className={styles.resInputWrapper}>
        <FormControlContainer>
          <FormControl fullWidth>
            <Label>{t('campaigns.create.workflow.inputFieldName')}</Label>
          </FormControl>
          <Grid container gap={2}>
            <Grid item lg={5}>
              <Input
                id="fieldName"
                aria-describedby="fieldName-helper-text"
                placeholder={t('campaigns.create.workflow.fieldName')}
                onChange={(e: any) => {
                  // setFieldName(e.target.value)
                  console.log("[LOG] response changed ", e.target);
                }}
              />
            </Grid>
            <Grid item lg={6}>
              <Input
                id="fieldPath"
                aria-describedby="fieldPath-helper-text"
                placeholder={t('campaigns.create.workflow.fieldPath')}
              />
            </Grid>
          </Grid>
        </FormControlContainer>
      </div>
      <FormControlContainer>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Field Name</TableCell>
                <TableCell>Json Path/Constant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(responses || []).map((element: any, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {element[Object.keys(element)[0]].attributeName}
                  </TableCell>
                  <TableCell>{element[Object.keys(element)[0]]?.fieldPath}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FormControlContainer>
    </div>

  return ret;
}

const SettingPane = (props: ISettingPaneProps) => {

  const {
    onDrawerClose, 
    onSaveParent, 
    properties, 
    onSelectAPI, 
    selectList,

    nodeId,
    workflow
  } = props;

  const { t } = useTranslation();
  
  const workNode = workflow.worklist.get(nodeId);
  const workData = workNode?.getInstance();
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectAction, setSelectAction] = React.useState('');
  const [fieldName, setFieldName] = React.useState('');
  const [testData, setTestData] = React.useState('');
  const [addFormData, setAddFormData] = React.useState<any>(properties || {});
  
  const [apis, setApis] = React.useState<IApiDetail[]>();
  const [requests, setRequests] = React.useState<IRequestItem[]>();
  const [responses, setResponses] = React.useState<IResponseItem[]>();
  
  useEffect(() => {
    if(workNode) {
      workNode.getApiList(). then((r) => { setApis(r) });
      workNode.getRequests(). then((r) => { setRequests(r) });
      workNode.getResponses(). then((r) => { setResponses(r) });
    }
  }, [workNode]);
  //functions
  
  const apiNameEditor = getApiNameEditor(workData, t);
  const apiSelector = getApiSelector(apis, t);
  const reqeustList = getReqeuestList(requests, t);
  const responseList = getResponseList(responses, t);

  //events
  const onSave = () => {
    if (onSaveParent) onSaveParent(addFormData);
  };

  const handleSetData = () => {};

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
      {/* status code editor */}

      {/* button group */}
        <Box className={styles.buttonGroup}>
          <Button variant="contained" text="Save" disabled={false} 
            onClick={onSave} 
          />
          <Button text="Cancel" variant="outlined" 
            onClick={onDrawerClose} 
          />
        </Box>
      </Container>
    </>
  );
};

export default SettingPane;
