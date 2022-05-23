import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Drawer, FormControl, FormHelperText, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { FormControlContainer, Input, Label, ReactSelect, TextArea } from 'common/styled';
import BasicModal from 'common/components/Based/BasicModal';
import Button from 'common/components/Based/Button';
import styles from './styles.module.scss';

interface IApiSettingProps {
  properties: any;
  onSave?: Function;
  onDrawerClose?: (event: React.KeyboardEvent | React.MouseEvent) => void;
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

const ApiSetting = ({ onDrawerClose, onSave, properties }: IApiSettingProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectAction, setSelectAction] = React.useState('');
  const [dataElements, setDataElements] = React.useState([]);
  const [fieldName, setFieldName] = React.useState('');
  const [addFormData, setAddFormData] = React.useState<any>(properties || {});
  const [testData, setTestData] = React.useState('');

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 10
        }}
      >
        <FormControlContainer>
          <FormControl fullWidth>
            <Label htmlFor="name">{t('workflow.setting.form.label.name')}</Label>
            <Input
              id="name"
              aria-describedby="stepName-helper-text"
              placeholder={t('workflow.setting.form.placeholder.name')}
              onChange={(e) => setAddFormData({ nodeName: e.target.value })}
              // defaultValue={getValues('workflow.stepName')}
              // {...register('workflow.stepName')}
            />
            {/* {formState.errors?.workflow?.stepName && (
                <FormHelperText id="stepName-helper-text" error>
                  {formState.errors.workflow.stepName.message}
                </FormHelperText>
              )} */}
          </FormControl>
        </FormControlContainer>
        <FormControlContainer>
          <FormControl fullWidth variant="standard">
            {/* <Label htmlFor="selectedAPI">{t('campaigns.create.workflow.action')}</Label> */}
            <ReactSelect
              id="selectedAPI"
              aria-describedby="action-helper-text"
              placeholder={t('workflow.setting.form.placeholder.selectedAPI')}
              defaultValue={initAction}
              options={actionOption}
              // {...register('workflow.action')}
              onChange={(newValue: any) => {
                setSelectAction(newValue.value);
              }}
              styles={{
                menuPortal: (provided) => ({
                  ...provided,
                  zIndex: 1001
                }),
                menu: (provided) => ({ ...provided, zIndex: 1001 })
              }}
            />
            {/* {formState.errors?.workflow?.action && (
                <FormHelperText id="action-helper-text" error>
                  {formState.errors.workflow.action.message}
                </FormHelperText>
              )} */}
          </FormControl>
        </FormControlContainer>
        <FormControlContainer>
          <div className={styles.borderLabel}>{t('workflow.setting.form.label.requestData')}</div>
        </FormControlContainer>
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
                {(dataElements || []).map((element: any, index) => (
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
                    // defaultValue={getValues('workflow.fieldName')}
                    // {...register('workflow.fieldName')}
                    onChange={(e: any) => setFieldName(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6}>
                  <Input
                    id="fieldPath"
                    aria-describedby="fieldPath-helper-text"
                    placeholder={t('campaigns.create.workflow.fieldPath')}
                    // defaultValue={getValues('workflow.fieldPath')}
                    // {...register('workflow.fieldPath')}
                    // onChange={(e: any) => {
                    //   setValue('workflow.fieldPath', e.target.value);
                    //   handleChangeFieldPath(e.target.value);
                    // }}
                    // onKeyPress={(ev: any) => {
                    //   if (ev.key === 'Enter') {
                    //     ev.preventDefault();
                    //     ev.stopPropagation();
                    //     setFieldName('');
                    //     setFieldPath('');
                    //     setValue('workflow.fieldName', '');
                    //     setValue('workflow.fieldPath', ''); // here was the mistake
                    //   }
                    // }}
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
                  {(dataElements || []).map((element: any, index) => (
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            borderRadius: 1
          }}
          style={{ width: '100%' }}
        >
          {/* <Button variant="contained" color="secondary" onClick={() => setIsModalOpen(true)} disabled={!workflowId}>
                  Test Step
                </Button> */}
          <Button variant="contained" text="Save" disabled={false} onClick={onSave?.(addFormData)} />
          <Button text="Cancel" variant="outlined" onClick={onDrawerClose} />
        </Box>
      </Container>
      <BasicModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TextArea
          id="testStepData"
          aria-describedby="testStep-helper-text"
          placeholder="Test Data"
          defaultValue={initTestStepData}
          // {...register('testStepData')}
          onChange={(e) => setTestData(e.target.value)}
        ></TextArea>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 1,
            borderRadius: 1
          }}
        >
          {/* <Button variant="contained" color="primary" disabled={isTestStepLoading} onClick={checkTestStep}>
                Test
              </Button> */}
        </Box>
      </BasicModal>
    </>
  );
};

export default ApiSetting;
